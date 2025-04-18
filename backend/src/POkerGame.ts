import { HandEvaluator, describeHand } from './HandEvaluator';
import { Deck } from './Deck';
import { Player } from './Player';
import { Card } from './Card';


export class PokerGame {
  private players!: Player[];
  private deck!: Deck;
  private communityCards: Card[] = [];
  private dealerIndex: number = 0;
  private pot: number = 0;
  private currentBet: number = 0;
  private sidePots: { amount: number; contenders: Player[] }[] = [];

  private pendingActionPlayer: Player | null = null;
  private currentAction: string = '';
  private lastReceivedAmount: number | null = null;

  private smallBlind!: number;
  private bigBlind!: number;

  constructor(players: Player[], smallBlind: number = 5, bigBlind: number = 10) {
    if (players.length < 2 || players.length > 6) {
      throw new Error("This version supports between 2 and 6 players.");
    }
  
    this.players = players;
    this.deck = new Deck();
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
  }
  
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
  
  private pendingActionResolver: ((action: string) => void) | null = null;
  private pendingActionOptions: string[] = [];
  private currentPlayerAwaitingAction: Player | null = null;
  
  private pendingAmountResolver: ((amount: number) => void) | null = null;
  private currentPlayerAwaitingAmount: Player | null = null;
  private amountRange: { min: number; max: number } = { min: 0, max: 0 };
  
  protected async requestPlayerAction(player: Player, options: string[]): Promise<string> {
    return new Promise((resolve) => {
      this.pendingActionResolver = resolve;
      this.pendingActionOptions = options;
      this.currentPlayerAwaitingAction = player;
    });
  }
  
  protected async requestPlayerAmount(player: Player, prompt: string, min: number, max: number): Promise<number> {
    console.log(`requestPlayerAmount called for ${player.name}: ${prompt} (min: ${min}, max: ${max})`);
    return new Promise((resolve) => {
      this.pendingAmountResolver = resolve;
      this.currentPlayerAwaitingAmount = player;
      this.amountRange = { min, max };
    });
  }
  
  public async handleAction(player: Player, action: string) {
    if (!this.pendingActionResolver) {
      console.warn("No action is currently pending.");
      return;
    }
  
    if (this.currentPlayerAwaitingAction !== player) {
      console.warn(`It's not ${player.name}'s turn.`);
      return;
    }
  
    if (!this.pendingActionOptions.includes(action)) {
      console.warn(`Invalid action "${action}".`);
      return;
    }
  
    if (action === "raise" || action === "bet") {
      this.pendingActionPlayer = player;
      this.currentAction = action;
  
      const amountPromise = new Promise<number>((resolve) => {
        this.pendingAmountResolver = resolve;
        this.currentPlayerAwaitingAmount = player;
        this.amountRange = {
          min: 10, // temporary; real min set in bettingRound
          max: player.stack + player.currentBet,
        };
      });
  
      console.log(`[ACTION] ${player.name} selected "${action}", awaiting amount...`);
      const amount = await amountPromise;
      this.lastReceivedAmount = amount;
  
      console.log(`[DEBUG] Received amount ${amount} from ${player.name} for ${action}`);
      
      // Only resolve the action now
      const resolver = this.pendingActionResolver;
      this.pendingActionResolver = null;
      this.currentPlayerAwaitingAction = null;
      this.pendingActionOptions = [];
      resolver(action);
  
      // Clean up amount stuff
      this.pendingAmountResolver = null;
      this.currentPlayerAwaitingAmount = null;
      this.pendingActionPlayer = null;
    } else {
      // Immediate actions (fold, call, check)
      const resolver = this.pendingActionResolver;
      this.pendingActionResolver = null;
      this.currentPlayerAwaitingAction = null;
      this.pendingActionOptions = [];
      resolver(action);
    }
  }
  
  public handleAmount(player: Player, amount: number) {
    console.log(`[DEBUG] handleAmount called with ${amount} from ${player.name}`);
  
    if (!this.pendingAmountResolver) {
      console.warn("No amount is currently pending.");
      return;
    }
  
    if (this.currentPlayerAwaitingAmount !== player) {
      console.warn(`It's not ${player.name}'s turn.`);
      return;
    }
  
    if (amount < this.amountRange.min || amount > this.amountRange.max) {
      console.warn(`Invalid amount: ${amount}. Must be between ${this.amountRange.min} and ${this.amountRange.max}`);
      return;
    }
  
    console.log(`[HANDLE AMOUNT] ${player.name} entered ${amount}`);
    this.pendingAmountResolver(amount);
  }

  private getCurrentTurnPlayer(): Player | null {
    const total = this.players.length;
    let index = (this.dealerIndex + 3) % total; // UTG = 3 seats after dealer
  
    for (let i = 0; i < total; i++) {
      const player = this.players[index];
      if (!player.folded && player.stack > 0) {
        return player;
      }
      index = (index + 1) % total;
    }
  
    return null;
  }

  public startHand() {
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

    this.currentPlayerAwaitingAction = this.getCurrentTurnPlayer();
    this.pendingActionOptions = ['fold', 'call', 'raise']; // adjust dynamically if needed
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

  public async bettingRound(roundName: string) {
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
      let action = await this.requestPlayerAction(player, options);
      
      while (!options.includes(action)) {
        console.log(`Invalid action received: "${action}". Asking again.`);
        action = await this.requestPlayerAction(player, options);
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
        let amount = await this.requestPlayerAmount(
            player,
            `Enter bet amount (min ${this.bigBlind}):`,
            this.bigBlind,
            player.stack
          );
  
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
      
        let raiseTo = await this.requestPlayerAmount(
            player,
            `Raise to (min ${minRaiseTo}${maxRaise < minRaiseTo ? ', max ' + maxRaise : ''}):`,
            Math.min(minRaiseTo, maxRaise),
            maxRaise
          );
      
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

  public getGameState(showHoleCards: boolean = false) {
    const state = {
      communityCards: this.communityCards.map(card => ({
        suit: card.suit,
        rank: card.rank
      })),
      pot: this.pot,
      sidePots: this.sidePots.map(pot => ({
        amount: pot.amount,
        contenders: pot.contenders.map(p => p.name)
      })),
      players: this.players.map(player => ({
        id: player.id,
        name: player.name,
        stack: player.stack,
        currentBet: player.currentBet,
        totalContributed: player.totalContributed,
        folded: player.folded,
        allIn: player.stack === 0,
        holeCards: (showHoleCards || player.stack === 0 || player.folded)
          ? player.holeCards.map(card => ({ suit: card.suit, rank: card.rank }))
          : []
      })),
      currentTurn: this.currentPlayerAwaitingAction?.name ?? null,
      validActions: this.pendingActionOptions,
      dealerIndex: this.dealerIndex,
      showdown: showHoleCards
    };
  
    return state;
  }
}