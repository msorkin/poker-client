import { Card } from './Card';

export class Player {
  id: string;
  name: string;
  chips: number;
  holeCards: Card[] = [];
  currentBet: number = 0;
  folded: boolean = false;
  allIn: boolean = false;

  constructor(id: string, name: string, startingChips: number) {
    this.id = id;
    this.name = name;
    this.chips = startingChips;
  }

  receiveCards(cards: Card[]) {
    this.holeCards = cards;
  }

  fold() {
    this.folded = true;
  }

  bet(amount: number) {
    if (amount > this.chips) {
      amount = this.chips;
      this.allIn = true;
    }
    this.chips -= amount;
    this.currentBet += amount;
    return amount;
  }

  resetForNextHand() {
    this.holeCards = [];
    this.currentBet = 0;
    this.folded = false;
    this.allIn = false;
  }
}
