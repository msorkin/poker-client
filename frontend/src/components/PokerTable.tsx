import React from 'react';
import './PokerTable.css';

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

interface PokerTableProps {
  players: PlayerState[];
  currentTurn: string | null;
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
}

const positions = [
  { top: '5%', left: '50%' },
  { top: '20%', left: '85%' },
  { top: '60%', left: '85%' },
  { top: '85%', left: '50%' },
  { top: '60%', left: '15%' },
  { top: '20%', left: '15%' },
];

const PokerTable: React.FC<PokerTableProps> = ({
  players,
  currentTurn,
  dealerIndex,
  smallBlindIndex,
  bigBlindIndex,
}) => {
  const radius = 250; // distance from center to player
  const centerX = 300;
  const centerY = 300;

  const positionedPlayers = players.map((player, index) => {
    const angle = (2 * Math.PI * index) / players.length;
    const x = centerX + radius * Math.cos(angle) - 50; // offset for width
    const y = centerY + radius * Math.sin(angle) - 30; // offset for height

    return {
      ...player,
      style: {
        left: `${x}px`,
        top: `${y}px`,
      },
    };
  });

  return (
    <div className="table">
      {positionedPlayers.map((player, index) => (
        <div
          key={player.id}
          className={`player ${player.name === currentTurn ? 'current-turn' : ''}`}
          style={player.style}
        >
          <strong>{player.name}</strong> <br />
          Stack: {player.stack} <br />
          Bet: {player.currentBet} <br />
          {index === dealerIndex && <div className="badge">D</div>}
          {index === smallBlindIndex && <div className="badge">SB</div>}
          {index === bigBlindIndex && <div className="badge">BB</div>}
        </div>
      ))}
    </div>
  );
};

export default PokerTable;