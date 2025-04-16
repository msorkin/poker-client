import React from 'react';

interface Card {
  suit: string;
  rank: string;
}

interface CardDisplayProps {
  cards: Card[];
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <span>Hidden</span>;
  }

  return (
    <span>
      {cards.map((card, i) => (
        <span key={i} style={{ marginRight: '8px' }}>
          {card.rank}
          {card.suit}
        </span>
      ))}
    </span>
  );
};

export default CardDisplay;