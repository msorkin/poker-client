import React from 'react';
import './PokerTable.css';
import CardDisplay from './CardDisplay';

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
  showdown: boolean;
  communityCards: Card[];
  pot: number;
  sidePots: { amount: number; contenders: string[] }[];
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
  showdown,
  communityCards,
  pot,
  sidePots,
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
      <div className="table-center">
        <div className="pot-display">
          <div>Pot: {pot}</div>
          {sidePots.length > 0 && (
            <div className="side-pots">
              {sidePots.map((sidePot, i) => (
                <div key={i} className="side-pot">
                  {sidePot.amount} — {sidePot.contenders.join(', ')}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="community-cards">
          <CardDisplay cards={communityCards} />
        </div>
      </div>

      {positionedPlayers.map((player, index) => (
        <div
          key={player.id}
          className={`player ${player.name === currentTurn ? 'current-turn' : ''} ${player.folded ? 'folded' : ''}`}
          style={player.style}
        >
          <strong>{player.name}</strong> <br />
          Stack: {player.stack} <br />
          Bet: {player.currentBet} <br />
          {index === dealerIndex && <div className="badge">D</div>}
          {index === smallBlindIndex && <div className="badge">SB</div>}
          {index === bigBlindIndex && <div className="badge">BB</div>}
          {showdown && !player.folded && player.holeCards && (
            <div style={{ 
              marginTop: '10px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '5px',
              borderRadius: '4px'
            }}>
              <CardDisplay cards={player.holeCards} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PokerTable;