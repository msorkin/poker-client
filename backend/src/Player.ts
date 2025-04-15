import { Card } from './Card';

export class Player {
  id: string;
  name: string;
  stack: number;
  holeCards: Card[] = [];
  currentBet: number = 0;
  totalContributed: number = 0;
  folded: boolean = false;
  allIn: boolean = false;
  hasMadeDecisionThisRound: number = 0; // Still using number if you're not switching to boolean

  constructor(id: string, name: string, startingStack: number) {
    this.id = id;
    this.name = name;
    this.stack = startingStack;
  }

  receiveCards(cards: Card[]) {
    this.holeCards = cards;
  }

  fold() {
    this.folded = true;
  }

  bet(amount: number) {
    if (amount > this.stack) {
      amount = this.stack;
      this.allIn = true;
    }
    this.stack -= amount;
    this.currentBet += amount;
    return amount;
  }

  winPot(amount: number) {
    this.stack += amount;
  }

  resetForNextHand() {
    this.holeCards = [];
    this.folded = false;
    this.currentBet = 0;
    this.totalContributed = 0;
    this.hasMadeDecisionThisRound = 0;
    this.allIn = false; // ✅ Reset allIn status between hands
  }
}