import React from 'react';

interface Card {
  suit: string;
  rank: string;
}

interface Player {
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
  players: Player[];
  currentTurn: string | null;
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
}

const PokerTable: React.FC<PokerTableProps> = ({
  players,
  currentTurn,
  dealerIndex,
  smallBlindIndex,
  bigBlindIndex,
}) => {
  return (
    <div>
      {players.map((player, index) => (
        <div key={player.id} style={{ marginBottom: 10 }}>
          <strong>{player.name}</strong>
          {index === dealerIndex && ' (Dealer)'}
          {index === smallBlindIndex && ' (SB)'}
          {index === bigBlindIndex && ' (BB)'}
          <div>
            Stack: {player.stack} | Bet: {player.currentBet}{' '}
            {currentTurn === player.name && <span>🟢 Your Turn</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokerTable;
