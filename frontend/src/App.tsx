import { useEffect, useState } from 'react';
import CardDisplay from './components/CardDisplay';
import ActionPanel from './components/ActionPanel';
import PokerTable from './components/PokerTable';

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
  validActions: string[]; // ✅ add this line
}

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(() => {
    return localStorage.getItem("playerId");
  });
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = async () => {
    try {
      const response = await fetch("http://localhost:3001/start", { method: "POST" });
      if (!response.ok) throw new Error('Failed to start game');
      
      // Set game started immediately
      setGameStarted(true);
      
      // Fetch updated state after a short delay
      setTimeout(() => {
        fetch(`http://localhost:3001/state/${playerId}`)
          .then((res) => res.json())
          .then((data) => setGameState(data));
      }, 500);
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  useEffect(() => {
    if (!playerId) return;
    
    fetch(`http://localhost:3001/state/${playerId}`)
      .then((res) => res.json())
      .then((data) => setGameState(data));
  }, [playerId]);

  if (!playerId) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Select Your Player</h2>
        <select
          onChange={(e) => {
            localStorage.setItem('playerId', e.target.value);
            window.location.reload();
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

  if (!gameState) {
    return (
      <div>
        <h2>Loading game...</h2>
        <button
          onClick={() => {
            localStorage.removeItem("playerId");
            window.location.reload();
          }}
        >
          Reset Player
        </button>
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
      {gameState.currentTurn ===
        gameState.players.find((p) => p.id === playerId)?.name && (
        <ActionPanel
        options={gameState.validActions || []}
          playerId={playerId}
          onActionSent={() => {
            setTimeout(() => {
              fetch(`http://localhost:3001/state/${playerId}`)
                .then((res) => res.json())
                .then((data) => setGameState(data));
            }, 500);
          }}
        />
      )}
    </div>
  );
}

export default App;