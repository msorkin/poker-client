import { useEffect, useState } from 'react';
import CardDisplay from './components/CardDisplay';
import ActionPanel from './components/ActionPanel';
import PokerTable from './components/PokerTable';
import './components/PokerTable.css';


interface Card {
  suit: string;
  rank: string;
}

interface PlayerState {
  id: string;
  name: string;
  stack: number;
  currentBet: number;
  totalContributed: number;
  folded: boolean;
  allIn: boolean;
  holeCards: Card[] | null;
}

interface GameState {
  communityCards: Card[];
  pot: number;
  sidePots: { amount: number; contenders: string[] }[];
  players: PlayerState[];
  currentTurn: string | null;
  dealerIndex: number;
  validActions: string[];
  showdown: boolean;
}

function App() {
  const [playerId, setPlayerId] = useState<string | null>(localStorage.getItem("playerId"));
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);


  const startGame = async () => {
    try {
      console.log("🟢 Start Game button clicked");
      console.log("👤 playerId at click time:", playerId);
  
      const currentPlayerId = playerId?.toString(); // make sure it's a string
      if (!currentPlayerId) {
        console.warn("🚫 No player ID found at game start.");
        return;
      }
  
      const response = await fetch("http://localhost:3001/start", {
        method: "POST",
      });
      console.log("📡 /start response status:", response.status);
      
      if (!response.ok) {
        const text = await response.text();
        console.error("❌ /start failed with status", response.status, "and body:", text);
        throw new Error("Failed to start game");
      }
  
      let tries = 0;
      const maxTries = 10;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  
      while (tries < maxTries) {
        try {
          console.log(`🕒 Waiting... try ${tries + 1}`);
          await delay(300);
          console.log(`🌐 Fetching game state for player ${currentPlayerId}`);
          const updated = await fetch(`http://localhost:3001/state/${currentPlayerId}`);
          const data = await updated.json();
  
          console.log(`🔎 Poll attempt ${tries + 1}:`, data);
  
          if (data.currentTurn) {
            console.log("✅ Game started. Setting gameStarted = true");
            setGameState(data);
            setGameStarted(true);
            return;
          }
        } catch (err) {
          console.error("❌ Polling error:", err);
        }
  
        tries++;
      }
  
      console.warn("⚠️ Game start polling failed: currentTurn never set.");
    } catch (err) {
      console.error("❌ Error starting game:", err);
    }
  };

  useEffect(() => {
    console.log("🔁 useEffect triggered. playerId:", playerId, "gameStarted:", gameStarted);
    if (!playerId) return;
  
    fetch(`http://localhost:3001/state/${playerId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Game state fetched in useEffect:", data);
        setGameState(data);
      
        // 🧠 Automatically control the player whose turn it is
        const currentTurnName = data.currentTurn;
        const activePlayer = data.players.find((p: PlayerState) => p.name === currentTurnName);
      
        if (activePlayer && activePlayer.id !== playerId) {
          console.log("🔄 Auto-switching to player:", activePlayer.name);
          localStorage.setItem("playerId", activePlayer.id);
          setPlayerId(activePlayer.id);
        }

      })
      .catch((err) => console.error("❌ Failed to fetch game state:", err));
  }, [playerId, gameStarted]);

  // Second useeffect for separate polling for game state
  useEffect(() => {
    if (!gameStarted || !playerId) return;
  
    const pollGameState = async () => {
      try {
        const response = await fetch(`http://localhost:3001/state/${playerId}`);
        const data = await response.json();
        console.log("📦 [poll] game state:", data);
        
        // Always update game state first
        setGameState(data);
  
        // Then handle player switching if needed
        const currentTurnName = data.currentTurn;
        const activePlayer = data.players.find((p: PlayerState) => p.name === currentTurnName);
  
        if (activePlayer && activePlayer.id !== playerId) {
          console.log("🔄 [poll] switching to:", activePlayer.name);
          localStorage.setItem("playerId", activePlayer.id);
          setPlayerId(activePlayer.id);
        }
      } catch (err) {
        console.error("❌ [poll] Failed:", err);
      }
    };

    // Initial poll immediately
    pollGameState();
  
    // Then set up interval
    const interval = setInterval(pollGameState, 500); // Poll every 500ms instead of 1000ms
  
    return () => clearInterval(interval);
  }, [gameStarted, playerId]);

  const handleActionSent = async () => {
    // Wait a moment for the server to process the action
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Then force a state refresh
    try {
      const response = await fetch(`http://localhost:3001/state/${playerId}`);
      const data = await response.json();
      setGameState(data);
    } catch (err) {
      console.error("Failed to refresh state after action:", err);
    }
  };

// 🔹 If no player selected, ask to pick one
if (!playerId) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Select Your Player</h2>
      <select
        onChange={(e) => {
          const id = e.target.value;
          if (id) {
            localStorage.setItem("playerId", id);
            setPlayerId(id);
          }
        }}
      >
        <option value="">-- Choose a player --</option>
        <option value="1">Alice</option>
        <option value="2">Bob</option>
        <option value="3">Charlie</option>
        <option value="4">Diana</option>
        <option value="5">Eddie</option>
        <option value="6">Fiona</option>
      </select>
    </div>
  );
}

// 🔹 If player is selected but game state hasn't loaded yet
if (!gameState) {
  return (
    <div>
      <h2>Loading game...</h2>
    </div>
  );
}

  const numPlayers = gameState.players.length;
  const dealerIndex = gameState.dealerIndex;
  const smallBlindIndex = (dealerIndex + 1) % numPlayers;
  const bigBlindIndex = (dealerIndex + 2) % numPlayers;

  return (
    <div style={{ padding: 20 }}>
      <h1>Poker Game</h1>

    <button onClick={startGame} style={{ marginBottom: 20 }}>
      Start Game
    </button>

    <button
    onClick={() => {
    localStorage.removeItem("playerId");
    setPlayerId(null);
    window.location.reload(); // <-- this ensures game resets
    }}
    style={{ marginLeft: 10 }}
  >
    🔄 Change Player
  </button>

      <h2>Community Cards:</h2>
      <CardDisplay cards={gameState.communityCards} />

      <h2>Players:</h2>
      <PokerTable
        players={gameState.players}
        currentTurn={gameState.currentTurn}
        dealerIndex={dealerIndex}
        smallBlindIndex={smallBlindIndex}
        bigBlindIndex={bigBlindIndex}
        showdown={gameState.showdown}
      />

      <h3>Pot: {gameState.pot}</h3>
      {gameState.sidePots.length > 0 && (
        <div>
          <h4>Side Pots:</h4>
          <ul>
            {gameState.sidePots.map((pot, i) => (
              <li key={i}>
                {pot.amount} chips — Contenders: {pot.contenders.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Current Turn: {gameState.currentTurn || 'N/A'}</h3>
      
      {!gameState.showdown && gameState.currentTurn ===
        gameState.players.find((p: PlayerState) => p.id.toString() === playerId)?.name && (
        <ActionPanel
          options={gameState.validActions || []}
          playerId={playerId}
          playerStack={gameState.players.find((p: PlayerState) => p.id.toString() === playerId)?.stack || 0}
          bigBlind={10}
          onActionSent={handleActionSent}
        />
      )}

      {gameState.showdown && (
        <div style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: '#2a2a2a',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ color: '#4CAF50', marginTop: 0 }}>🏆 Showdown!</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {gameState.players
              .filter(p => !p.folded)
              .map(player => (
                <div key={player.id} style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: 10,
                  backgroundColor: '#3a3a3a',
                  borderRadius: 4
                }}>
                  <strong>{player.name}:</strong>
                  <CardDisplay cards={player.holeCards || []} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;