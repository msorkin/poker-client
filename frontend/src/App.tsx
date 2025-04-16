import { useEffect, useState } from 'react';
import CardDisplay from './components/CardDisplay';
import ActionPanel from './components/ActionPanel';

interface Card {
  suit: string;
  rank: string;
}

interface PlayerState {
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
}

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const playerId = '1'; // for now, pretend we're Alice

  useEffect(() => {
    fetch(`http://localhost:3001/state/${playerId}`)
      .then(res => res.json())
      .then(data => setGameState(data))
      .catch(err => console.error('Error fetching game state:', err));
  }, []);

  if (!gameState) return <div>Loading game...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Poker Game</h1>
      <h2>Community Cards:</h2>
      <CardDisplay cards={gameState.communityCards} />

      <h2>Players:</h2>
      <ul>
        {gameState.players.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong> - Stack: {p.stack} - Bet: {p.currentBet} - Folded: {p.folded ? 'Yes' : 'No'}
            <br />
            Hole Cards: <CardDisplay cards={p.holeCards || []} />
          </li>
        ))}
      </ul>

      <h3>Pot: {gameState.pot}</h3>
      {gameState.sidePots.length > 0 && (
        <div>
          <h4>Side Pots:</h4>
          <ul>
            {gameState.sidePots.map((pot, i) => (
              <li key={i}>
                {pot.amount} chips - Contenders: {pot.contenders.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Current Turn: {gameState.currentTurn || 'N/A'}</h3>
      {gameState.currentTurn === gameState.players.find(p => p.name === 'Alice')?.name && (
  <ActionPanel
    options={['fold', 'call', 'raise']} // TEMP: hardcoded, we'll improve this later
    playerId={playerId}
    onActionSent={() => {
      setTimeout(() => {
        fetch(`http://localhost:3001/state/${playerId}`)
          .then(res => res.json())
          .then(data => setGameState(data));
      }, 500); // give server time to update
    }}
  />
)}
    </div>
  );
}

export default App;
