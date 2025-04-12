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

  private getBettingOrder(roundName: string): Player[] {
    let startIndex: number;
    if (roundName === 'Preflop') {
      // Start after big blind (UTG)
      startIndex = (this.dealerIndex + 2) % this.players.length; // Big blind
      startIndex = (startIndex + 1) % this.players.length; // UTG
    } else {
      // Start after dealer
      startIndex = (this.dealerIndex + 1) % this.players.length;
    }
    const order: Player[] = [];
    for (let i = 0; i < this.players.length; i++) {
      const index = (startIndex + i) % this.players.length;
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
  
    // Get players still playing
    let activePlayers = this.players.filter(p => !p.folded && p.stack > 0);
    // Stop if only one or no players
    if (activePlayers.length <= 1) {
      console.log("Only one player can act. Skipping betting round.");
      return;
    }
  
    // Reset decision flags
    this.players.forEach(p => (p.hasMadeDecisionThisRound = 0));
  
    // Get the order
    let bettingOrder = this.getBettingOrder(roundName);
    // Current bet
    let currentBet = this.currentBet;
    // Track last raise and bet amounts
    let lastRaiseAmount = roundName === 'Preflop' ? this.bigBlind : 0;
    let lastBetAmount = 0;
    // Start with big blind as aggressor (preflop)
    let lastAggressor: Player | null = roundName === 'Preflop' ? this.players[(this.dealerIndex + 2) % this.players.length] : null;
    let playerBeforeAggressor: Player | null = null;
  
    // Start with first player
    let currentIndex = 0;
  
    // Keep going while multiple players
    while (activePlayers.length > 1) {
      let player = bettingOrder[currentIndex % bettingOrder.length];
  
      // Skip folded or no-chip players
      if (player.folded || player.stack === 0) {
        currentIndex++;
        continue;
      }
  
      // Amount to match
      const toCall = currentBet - player.currentBet;
      console.log(`\n${player.name}'s turn (stack: ${player.stack}, to call: ${toCall})`);
  
      // Choices
      const options: string[] = [];
      if (toCall === 0) {
        options.push('check');
        if (player.stack >= this.bigBlind) options.push('bet');
      } else {
        options.push('fold');
        options.push('call');
        if (player.stack >= toCall) options.push('raise');
      }
  
      console.log(`Options: ${options.join(', ')}`);
      let action = readlineSync.question('Choose action: ').toLowerCase();
  
      while (!options.includes(action)) {
        action = readlineSync.question('Invalid action. Choose again: ').toLowerCase();
      }
  
      let isAggressiveAction = false;
  
      if (action === 'fold') {
        player.folded = true;
        console.log(`${player.name} folds.`);
        player.hasMadeDecisionThisRound = 1;
        activePlayers = this.players.filter(p => !p.folded && p.stack > 0);
      } else if (action === 'check') {
        console.log(`${player.name} checks.`);
        player.hasMadeDecisionThisRound = 1;
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
        player.hasMadeDecisionThisRound = 1;
      } else if (action === 'bet') {
        let amount = parseInt(readlineSync.question(`Enter bet amount (min ${this.bigBlind}): `));
        while (isNaN(amount) || amount < this.bigBlind || amount > player.stack) {
          amount = parseInt(readlineSync.question(`Invalid amount. Enter bet amount (min ${this.bigBlind}): `));
        }
  
        player.stack -= amount;
        player.currentBet += amount;
        this.pot += amount;
  
        lastBetAmount = currentBet;
        lastRaiseAmount = amount;
        currentBet = amount;
        lastAggressor = player;
        isAggressiveAction = true;
        player.hasMadeDecisionThisRound = 1;
        activePlayers.forEach(p => {
          if (p !== player) p.hasMadeDecisionThisRound = 0;
        });
        console.log(`${player.name} bets ${amount}.`);
      } else if (action === 'raise') {
        const minRaise = lastRaiseAmount - lastBetAmount || this.bigBlind;
        const minRaiseTo = lastRaiseAmount + minRaise;
        const maxRaise = player.stack;
        let raiseTo = parseInt(readlineSync.question(`Raise to (min ${minRaiseTo}${maxRaise < minRaise ? ', max ' + maxRaise : ''}): `));
        while (
          isNaN(raiseTo) ||
          raiseTo <= currentBet ||
          raiseTo > player.currentBet + maxRaise
        ) {
          raiseTo = parseInt(readlineSync.question(`Invalid amount. Raise to (min ${minRaiseTo}${maxRaise < minRaise ? ', max ' + maxRaise : ''}): `));
        }
  
        const raiseAmount = raiseTo - player.currentBet;
        player.stack -= raiseAmount;
        player.currentBet += raiseAmount;
        this.pot += raiseAmount;
  
        if (raiseAmount < minRaise && raiseAmount === maxRaise) {
          console.log(`${player.name} is all-in with ${raiseAmount}, raising to ${raiseTo}.`);
        } else {
          console.log(`${player.name} raises to ${raiseTo}.`);
        }
  
        lastBetAmount = currentBet;
        lastRaiseAmount = raiseTo;
        currentBet = raiseTo;
        lastAggressor = player;
        isAggressiveAction = true;
        player.hasMadeDecisionThisRound = 1;
        activePlayers.forEach(p => {
          if (p !== player) p.hasMadeDecisionThisRound = 0;
        });
      }
  
      // End round check
      if (activePlayers.every(p => p.hasMadeDecisionThisRound === 1)) {
        const allBetsMatched = activePlayers.every(p => p.currentBet === currentBet || p.stack === 0);
        if (currentBet === 0 || allBetsMatched) {
          break;
        }
      }
  
      // Update playerBeforeAggressor only for aggressive actions
      if (lastAggressor && isAggressiveAction) {
        const aggressorIndex = bettingOrder.indexOf(lastAggressor);
        for (let i = 1; i <= bettingOrder.length; i++) {
          const prevIndex = (aggressorIndex - i + bettingOrder.length) % bettingOrder.length;
          const prevPlayer = bettingOrder[prevIndex];
          if (!prevPlayer.folded && prevPlayer.stack > 0) {
            playerBeforeAggressor = prevPlayer;
            break;
          }
        }
      }
  
      // After bet/raise, go to next player
      if (isAggressiveAction) {
        const nextPlayer = this.getNextActivePlayer(bettingOrder, player);
        currentIndex = bettingOrder.indexOf(nextPlayer);
        continue;
      }
  
      // Move to next player
      currentIndex++;
    }
  
    // Reset for next round
    this.currentBet = 0;
    this.players.forEach(p => {
      p.currentBet = 0;
      p.hasMadeDecisionThisRound = 0;
    });
    console.log(`Pot is now ${this.pot}`);
  }
}