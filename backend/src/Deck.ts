import { Card } from './Card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    const suits = ['♠', '♥', '♦', '♣'] as const;
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(count: number): Card[] {
    return this.cards.splice(0, count);
  }
}