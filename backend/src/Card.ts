export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export class Card {
  constructor(
    public suit: Suit,
    public rank: Rank
  ) {}

  toString() {
    return `${this.rank}${this.suit}`;
  }
}
