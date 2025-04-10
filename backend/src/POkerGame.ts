import { HandEvaluator, describeHand } from './HandEvaluator';
import { Deck } from './Deck';
import { Player } from './Player';
import { Card } from './Card';

export class PokerGame {
  private players: Player[];
  private deck: Deck;
  private communityCards: Card[] = [];
  private dealerIndex: number = 0;
  private pot: number = 0;
  private currentBet: number = 0;

  constructor(players: Player[]) {
    if (players.length < 2 || players.length > 6) {
      throw new Error("This version supports between 2 and 6 players.");
    }
    this.players = players;
    this.deck = new Deck();
  }

  startHand() {
    this.dealerIndex = (this.dealerIndex + 1) % this.players.length;

    this.communityCards = [];
    this.deck.reset();

    this.players.forEach(p => p.resetForNextHand());
    this.players.forEach(p => p.receiveCards(this.deck.deal(2)));

    console.log("Hole cards dealt.");
  }

  dealFlop() {
    const flop = this.deck.deal(3);
    this.communityCards.push(...flop);
    console.log(`Flop: ${flop.map(card => card.toString()).join(' ')}`);
  }

  dealTurn() {
    const turn = this.deck.deal(1);
    this.communityCards.push(...turn);
    console.log(`Turn: ${turn[0].toString()}`);
  }

  dealRiver() {
    const river = this.deck.deal(1);
    this.communityCards.push(...river);
    console.log(`River: ${river[0].toString()}`);
  }

  private getBettingOrder(): Player[] {
    const bbIndex = (this.dealerIndex + 2) % this.players.length;
    const order: Player[] = [];
  
    for (let i = 1; i < this.players.length; i++) {
      const index = (bbIndex + i) % this.players.length;
      order.push(this.players[index]);
    }
  
    return order;
  }

  getCommunityCards(): Card[] {
    return this.communityCards;
  }

  showdown() {
    const board = this.getCommunityCards();
    const results = this.players.map(player => {
      const fullHand = [...player.holeCards, ...board];
      const best = HandEvaluator.evaluateBestHand(fullHand);
      return {
        player,
        hand: best
      };
    });

    results.forEach(r => {
      console.log(`${r.player.name}'s best hand: ${describeHand(r.hand)}`);
    });

    results.sort((a, b) => HandEvaluator.compareHands(a.hand, b.hand));
    const winner = results[0];
    console.log(`🏆 Winner: ${winner.player.name} with ${describeHand(winner.hand)}`);
  }

  private reorderBetting(lastRaisePlayer: Player): Player[] {
    const bbIndex = (this.dealerIndex + 2) % this.players.length;
    const order: Player[] = [];
    const lastRaiseIndex = this.players.indexOf(lastRaisePlayer);
    
    for (let i = 1; i < this.players.length; i++) {
      const index = (lastRaiseIndex + i) % this.players.length;
      order.push(this.players[index]);
    }
    
    return order;
  }

  bettingRound(roundName: string) {
    console.log(`\n--- ${roundName} Betting Round ---`);

    let activePlayers = this.players.filter(p => !p.folded);
    let bettingOrder = this.getBettingOrder();

    let roundOver = false;
    let currentBet = this.currentBet;
    let lastAggressorIndex = -1;

    while (!roundOver) {
      roundOver = true;

      for (let i = 0; i < bettingOrder.length; i++) {
        const player = bettingOrder[i];
        if (player.folded) continue;

        const toCall = currentBet - player.currentBet;

        // Mocked decision logic (to be replaced later)
        //let action: 'call' | 'raise' | 'fold' = 'call';
        //if (toCall > 0 && Math.random() < 0.3) action = 'fold';
        //else if (player.chips > toCall + 100 && Math.random() < 0.3) action = 'raise';

        let action: 'call' | 'raise' = 'call';
        if (player.chips > toCall + 100 && Math.random() < 0.3) {
          action = 'raise';
        }

        /*if (action === 'fold') {
          player.folded = true;
          console.log(`${player.name} folds.`);
          continue;
        }*/

        if (action === 'call') {
          player.chips -= toCall;
          player.currentBet += toCall;
          this.pot += toCall;
          console.log(`${player.name} calls ${toCall}.`);
        }

        if (action === 'raise') {
          const raiseAmount = 100;
          const totalBet = toCall + raiseAmount;
          player.chips -= totalBet;
          player.currentBet += totalBet;
          this.pot += totalBet;
          currentBet = player.currentBet;
          lastAggressorIndex = i;
          console.log(`${player.name} raises to ${currentBet}.`);

          // restart betting loop from next player
          bettingOrder = this.reorderBetting(player);
          roundOver = false;
          break;
        }
      }

      activePlayers = this.players.filter(p => !p.folded);
      if (activePlayers.length <= 1) break;
    }

    this.currentBet = 0;
    this.players.forEach(p => p.currentBet = 0);
    console.log(`Pot is now ${this.pot}`);
  }
}
