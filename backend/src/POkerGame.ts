import { HandEvaluator, describeHand } from './HandEvaluator';
import { Deck } from './Deck';
import { Player } from './Player';
import { Card } from './Card';
import readlineSync from 'readline-sync';

export class PokerGame {
  private players: Player[];
  private deck: Deck;
  private communityCards: Card[] = [];
  private dealerIndex: number = 0;
  private pot: number = 0;
  private currentBet: number = 0;

  private smallBlind: number;
  private bigBlind: number;

  constructor(players: Player[], smallBlind: number = 5, bigBlind: number = 10) {
    if (players.length < 2 || players.length > 6) {
      throw new Error("This version supports between 2 and 6 players.");
    }

    this.players = players;
    this.deck = new Deck();
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
  }

  startHand() {
    this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
    const rotated = [...this.players.slice(this.dealerIndex), ...this.players.slice(0, this.dealerIndex)];
    this.players = rotated;
    this.dealerIndex = 0;

    console.log(`\n💥 Starting Hand (Dealer: ${this.players[0].name})`);
    this.communityCards = [];
    this.pot = 0;
    this.deck.reset();

    this.players.forEach(p => p.resetForNextHand());
    this.players.forEach(p => p.receiveCards(this.deck.deal(2)));

    console.log("Hole cards dealt.");
    this.postBlinds();
  }

  postBlinds() {
    const sbIndex = (this.dealerIndex + 1) % this.players.length;
    const bbIndex = (this.dealerIndex + 2) % this.players.length;

    const sb = this.players[sbIndex];
    const bb = this.players[bbIndex];

    const sbAmount = sb.bet(this.smallBlind);
    const bbAmount = bb.bet(this.bigBlind);

    this.pot += sbAmount + bbAmount;
    this.currentBet = this.bigBlind;

    console.log(`${sb.name} posts small blind: ${sbAmount}`);
    console.log(`${bb.name} posts big blind: ${bbAmount}`);
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

  showdown() {
    const board = this.getCommunityCards();
    const results = this.players.map(player => {
      const fullHand = [...player.holeCards, ...board];
      const best = HandEvaluator.evaluateBestHand(fullHand);
      return { player, hand: best };
    });

    results.forEach(r => {
      console.log(`${r.player.name}'s best hand: ${describeHand(r.hand)}`);
    });

    results.sort((a, b) => HandEvaluator.compareHands(a.hand, b.hand));
    const winner = results[0];
    console.log(`🏆 Winner: ${winner.player.name} with ${describeHand(winner.hand)}`);

    const winners = results.filter(r => HandEvaluator.compareHands(r.hand, winner.hand) === 0);
    const splitPot = Math.floor(this.pot / winners.length);

    winners.forEach(w => {
      w.player.stack += splitPot;
      console.log(`${w.player.name} wins ${splitPot} chips.`);
    });

    this.players = this.players.filter(p => p.stack > 0);
    this.displayChipCounts();
  }

  displayChipCounts() {
    console.log(`\nChip Counts After Hand:`);
    this.players.forEach(p => {
      console.log(`${p.name}: ${p.stack} chips`);
    });
    console.log('\n----------------------------------------');
  }

  private reorderBetting(lastRaisePlayer: Player): Player[] {
    const lastRaiseIndex = this.players.indexOf(lastRaisePlayer);
    const order: Player[] = [];

    for (let i = 1; i < this.players.length; i++) {
      const index = (lastRaiseIndex + i) % this.players.length;
      order.push(this.players[index]);
    }

    return order;
  }

  private getNextActivePlayer(order: Player[], fromPlayer: Player): Player {
    const startIndex = order.indexOf(fromPlayer);
    for (let i = 1; i < order.length; i++) {
      const next = order[(startIndex + i) % order.length];
      if (!next.folded && next.stack > 0) return next;
    }
    return fromPlayer; // fallback, should never happen
  }

  getCommunityCards(): Card[] {
    return this.communityCards;
  }

  getActivePlayers(): Player[] {
    return this.players.filter(p => p.stack > 0);
  }

  bettingRound(roundName: string) {
    console.log(`\n--- ${roundName} Betting Round ---`);
  
    let activePlayers = this.players.filter(p => !p.folded);
    let bettingOrder = this.getBettingOrder();
  
    const canAct = activePlayers.filter(p => p.stack > 0);
    if (canAct.length <= 1) {
      console.log("All players are all-in or only one can act. Skipping betting round.");
      return;
    }
  
    let currentBet = this.currentBet;
    let lastBet = currentBet;
    let lastRaiseSize = this.bigBlind;
    let closingActionPlayer: Player | null = null;
  
    let index = 0;
    let roundOver = false;
  
    while (!roundOver) {
      const player = bettingOrder[index % bettingOrder.length];
  
      if (!player || player.folded || player.stack === 0) {
        index++;
        continue;
      }
  
      // ✅ Round ends when action comes back to closingActionPlayer
      if (closingActionPlayer && player === closingActionPlayer) {
        const stillIn = this.players.filter(p => !p.folded && p.stack > 0);
        const allBetsMatched = stillIn.every(p => p.currentBet === currentBet || p.stack === 0);
        if (allBetsMatched) break;
      }
  
      const toCall = currentBet - player.currentBet;
      console.log(`\n${player.name}'s turn (stack: ${player.stack}, to call: ${toCall})`);
  
      const options: string[] = [];
      if (toCall === 0) {
        options.push('check');
        if (player.stack >= this.bigBlind) options.push('bet');
      } else {
        options.push('fold');
        options.push('call');
        if (player.stack > toCall + this.bigBlind) options.push('raise');
      }
  
      console.log(`Options: ${options.join(', ')}`);
      let action = readlineSync.question('Choose action: ').toLowerCase();
  
      while (!options.includes(action)) {
        action = readlineSync.question('Invalid action. Choose again: ').toLowerCase();
      }
  
      if (action === 'fold') {
        player.folded = true;
        console.log(`${player.name} folds.`);
      } else if (action === 'check') {
        console.log(`${player.name} checks.`);
      } else if (action === 'call') {
        const amount = Math.min(toCall, player.stack);
        player.stack -= amount;
        player.currentBet += amount;
        this.pot += amount;
  
        if (amount < toCall) {
          console.log(`${player.name} is all-in with ${amount}.`);
        } else {
          console.log(`${player.name} calls ${amount}.`);
        }
      } else if (action === 'bet') {
        let amount = parseInt(readlineSync.question(`Enter bet amount (min ${this.bigBlind}): `));
        while (isNaN(amount) || amount < this.bigBlind || amount > player.stack) {
          amount = parseInt(readlineSync.question(`Invalid amount. Enter bet amount (min ${this.bigBlind}): `));
        }
  
        player.stack -= amount;
        player.currentBet += amount;
        this.pot += amount;
  
        currentBet = amount;
        lastRaiseSize = amount;
        lastBet = amount;
        closingActionPlayer = this.getNextActivePlayer(bettingOrder, player); // ✅ Important
        console.log(`${player.name} bets ${amount}.`);
  
        index = 0;
        continue;
      } else if (action === 'raise') {
        const minRaise = lastRaiseSize;
        let raiseTo = parseInt(readlineSync.question(`Raise to (min ${toCall + minRaise}): `));
        while (
          isNaN(raiseTo) ||
          raiseTo < toCall + minRaise ||
          raiseTo > player.stack + player.currentBet
        ) {
          raiseTo = parseInt(readlineSync.question(`Invalid amount. Raise to (min ${toCall + minRaise}): `));
        }
  
        const raiseAmount = raiseTo - player.currentBet;
        player.stack -= raiseAmount;
        player.currentBet += raiseAmount;
        this.pot += raiseAmount;
  
        currentBet = raiseTo;
        lastRaiseSize = raiseTo - lastBet;
        lastBet = raiseTo;
  
        closingActionPlayer = this.getNextActivePlayer(bettingOrder, player); // ✅ Important
        console.log(`${player.name} raises to ${raiseTo}.`);
  
        index = 0;
        continue;
      }
  
      index++;
    }
  

    this.currentBet = 0;
    this.players.forEach(p => p.currentBet = 0);
    console.log(`Pot is now ${this.pot}`);
  }
}