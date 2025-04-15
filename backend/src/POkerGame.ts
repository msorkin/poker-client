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
  private sidePots: { amount: number; contenders: Player[] }[] = [];

  private smallBlind: number;
  private bigBlind: number;

  private rebuildSidePots() {
    this.sidePots = [];
  
    if (this.pot <= 0) return;
  
    const allInPlayers = this.players
      .filter(p => p.stack === 0 && p.totalContributed > 0)
      .sort((a, b) => a.totalContributed - b.totalContributed);
  
    if (allInPlayers.length === 0) {
      this.sidePots = [{
        amount: this.pot,
        contenders: this.players.filter(p => !p.folded)
      }];
      return;
    }
  
    const lowestAllIn = allInPlayers[0].totalContributed;
  
    // Any player who contributed anything goes into the main pot,
    // but only up to the all-in amount
    const contributors = this.players.filter(p => p.totalContributed > 0);
    const mainPotBase = contributors.reduce((sum, p) => {
      return sum + Math.min(p.totalContributed, lowestAllIn);
    }, 0);
  
    const mainPotContenders = this.players.filter(
      p => !p.folded && p.totalContributed >= lowestAllIn
    );
  
    this.sidePots.push({
      amount: mainPotBase,
      contenders: mainPotContenders
    });
  
    let remainingPot = this.pot - mainPotBase;
  
    if (remainingPot > 0) {
      const sidePotContenders = this.players.filter(
        p => !p.folded && p.totalContributed > lowestAllIn
      );
  
      this.sidePots.push({
        amount: remainingPot,
        contenders: sidePotContenders
      });
    }
  
    // Debug logging
    console.log("--- Debug Side Pot Calculation ---");
    console.log(`Total pot: ${this.pot}`);
    console.log(`All-in players: ${allInPlayers.map(p => `${p.name}(${p.totalContributed})`).join(', ')}`);
    console.log(`Lowest all-in: ${lowestAllIn}`);
    console.log(`Main pot contenders: ${mainPotContenders.map(p => p.name).join(', ')}`);
    console.log(`Main pot base (with blinds): ${mainPotBase}`);
    console.log(`Side pot amount: ${remainingPot}`);
    console.log("--------------------------------");
  }

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
    this.sidePots = []; // Reset side pots at the beginning of the hand
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
  
    // ✅ Track small blind and big blind in totalContributed
    sb.totalContributed += sbAmount;
    bb.totalContributed += bbAmount;
  
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
    const playersInShowdown = this.players.filter(p => !p.folded && p.holeCards.length > 0);
  
    // Make sure side pots are updated
    this.rebuildSidePots();
    
    if (this.sidePots.length === 0) {
      // If no side pots were created, make a main pot with all chips
      this.sidePots.push({
        amount: this.pot,
        contenders: [...playersInShowdown]
      });
    }
  
    // Evaluate hands
    const handResults = new Map<Player, ReturnType<typeof HandEvaluator.evaluateBestHand>>();
    for (const player of playersInShowdown) {
      const fullHand = [...player.holeCards, ...board];
      const best = HandEvaluator.evaluateBestHand(fullHand);
      handResults.set(player, best);
      console.log(`${player.name}'s best hand: ${describeHand(best)}`);
    }
  
    // Distribute each pot
    for (const [i, pot] of this.sidePots.entries()) {
      const contenders = pot.contenders.filter(p => handResults.has(p));
      if (contenders.length === 0) continue;
  
      contenders.sort((a, b) =>
        HandEvaluator.compareHands(handResults.get(a)!, handResults.get(b)!)
      );
  
      const bestHand = handResults.get(contenders[0])!;
      const winners = contenders.filter(p =>
        HandEvaluator.compareHands(handResults.get(p)!, bestHand) === 0
      );
  
      const share = Math.floor(pot.amount / winners.length);
      const remainder = pot.amount % winners.length;
      const potLabel = i === 0 ? 'main pot' : `side pot #${i}`;
      
      winners.forEach((p, idx) => {
        // Add remainder to first winner if pot doesn't divide evenly
        const winAmount = idx === 0 ? share + remainder : share;
        p.stack += winAmount;
        console.log(`${p.name} wins ${winAmount} chips from ${potLabel}.`);
      });
    }
  
    this.players.forEach(p => p.totalContributed = 0);
    this.pot = 0;
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

    let activePlayers: Player[] = [];
    let canAct: Player[] = [];
    
    activePlayers = this.players.filter(p => !p.folded);

    if (activePlayers.length === 1) {
      const winner = activePlayers[0];
      console.log(`All other players folded. ${winner.name} wins the pot of ${this.pot} chips.`);
      winner.stack += this.pot;
      this.pot = 0;
      return;
    }

canAct = activePlayers.filter(p => p.stack > 0);

if (canAct.length <= 1) {
  console.log("All players are all-in or only one player can act. Skipping betting round.");
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
    
    let lastBetBeforeRaise = 0;
    let lastRaiseTo = 0;
    let lastLegalRaiseTo = 0;
    let lastLegalAggressor: Player | null = null;

    // Current player index
    let currentIndex = 0;
    
    // Keep betting until all active players have acted and bets are matched
    let roundComplete = false;
    
    let wasShortRaise = false;
    
    while (!roundComplete) {
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
        if (
            player.stack > toCall &&
            !(wasShortRaise && lastLegalAggressor === player)
          ) {
            options.push('raise');
          }
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
        
        // Check if only one player remains active
        if (activePlayers.length === 1) {
          console.log(`All players except ${activePlayers[0].name} have folded.`);
          roundComplete = true;
          break;
        }
      } else if (action === 'check') {
        console.log(`${player.name} checks.`);
        player.hasMadeDecisionThisRound = 1;
      } else if (action === 'call') {
        const amount = Math.min(toCall, player.stack);
        player.stack -= amount;
        player.currentBet += amount;
        player.totalContributed += amount;
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
        player.totalContributed += amount;
        this.pot += amount;
  
        lastBetBeforeRaise = 0;
        lastRaiseTo = amount;
        lastLegalRaiseTo = amount;
        currentBet = amount;
        lastAggressor = player;
        isAggressiveAction = true;
        
        // Reset decisions for all other players
        player.hasMadeDecisionThisRound = 1;
        activePlayers.forEach(p => {
          if (p !== player) p.hasMadeDecisionThisRound = 0;
        });
        
        console.log(`${player.name} bets ${amount}.`);
    } else if (action === 'raise') {
        const minRaiseAmount = lastLegalRaiseTo - lastBetBeforeRaise;
        const minRaiseTo = currentBet + minRaiseAmount;
        const maxRaise = player.stack + player.currentBet;
      
        let raiseTo = parseInt(readlineSync.question(`Raise to (min ${minRaiseTo}${maxRaise < minRaiseTo ? ', max ' + maxRaise : ''}): `));
      
        while (
            isNaN(raiseTo) ||
            raiseTo > maxRaise ||
            (raiseTo < minRaiseTo && raiseTo < maxRaise)  // allow all-in short raise if raiseTo === max
          ) {
          raiseTo = parseInt(readlineSync.question(`Invalid amount. Raise to (min ${minRaiseTo}${maxRaise < minRaiseTo ? ', max ' + maxRaise : ''}): `));
        }
      
        const raiseAmount = raiseTo - player.currentBet;
        player.stack -= raiseAmount;
        player.currentBet += raiseAmount;
        player.totalContributed += raiseAmount;
        this.pot += raiseAmount;
      
        if (player.stack === 0) {
          console.log(`${player.name} is all-in with ${raiseAmount}, raising to ${raiseTo}.`);
        } else {
          console.log(`${player.name} raises to ${raiseTo}.`);
        }
      
        // Detect if this is a short raise
        wasShortRaise = (raiseTo - currentBet) < minRaiseAmount;
      
        if (!wasShortRaise) {
          lastLegalAggressor = player;
          lastLegalRaiseTo = raiseTo;
          lastBetBeforeRaise = currentBet;
        }
      
        lastAggressor = player;
        lastRaiseTo = raiseTo;
        currentBet = raiseTo;
        lastBetAmount = currentBet;
        isAggressiveAction = true;
      
        // Reset decision flags for other players
        player.hasMadeDecisionThisRound = 1;
        activePlayers.forEach(p => {
          if (p !== player) p.hasMadeDecisionThisRound = 0;
        });
      }
  
      // Advance to next player
      currentIndex++;

      activePlayers = this.players.filter(p => !p.folded && p.stack > 0);
      canAct = activePlayers.filter(p => p.stack > 0);

      // Check if the round is complete after this action
      // Round is complete when all active players have made a decision AND
      // either everyone has checked (currentBet === 0) or all bets are matched
      if (activePlayers.every(p => p.hasMadeDecisionThisRound === 1)) {
        const allBetsMatched = activePlayers.every(p => p.currentBet === currentBet || p.stack === 0);
        if (allBetsMatched) {
          roundComplete = true;
        }
      }
    }

    // Update the current bet for the next round
    this.currentBet = 0;

    // Reset player bets for next round
    this.players.forEach(p => {
    p.currentBet = 0;
    p.hasMadeDecisionThisRound = 0;
});

this.rebuildSidePots();
const mainPot = this.sidePots.length > 0 ? this.sidePots[0].amount : this.pot;
const sidePot = this.sidePots.length > 1 
  ? this.sidePots.slice(1).reduce((sum, pot) => sum + pot.amount, 0) 
  : 0;
console.log(`Pot is now ${this.pot} (Main pot: ${mainPot}, Side pot: ${sidePot})`);

  }
}