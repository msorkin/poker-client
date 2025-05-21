import { HandEvaluator, describeHand } from './HandEvaluator';
import { Deck } from './Deck';
import { Player } from './Player';
import { Card } from './Card';
import { GameService } from './services/game.service';
import { BettingRound } from '@prisma/client';

export class PokerGame {
  private players!: Player[];
  private deck!: Deck;
  private communityCards: Card[] = [];
  private dealerIndex: number = 0;
  private pot: number = 0;
  private currentBet: number = 0;
  private sidePots: { amount: number; contenders: Player[] }[] = [];
  private gameService: GameService;
  private gameId: string;
  private currentHandId: string | null = null;

  private pendingActionPlayer: Player | null = null;
  private currentAction: string = '';
  private lastReceivedAmount: number | null = null;

  private lastLegalRaiseTo: number = 0;
  private lastBetBeforeRaise: number = 0;
  private lastRaiseTo: number = 0;
  private lastBetAmount: number = 0;

  private smallBlind!: number;
  private bigBlind!: number;

  private isShowdown: boolean = false;

  private lastShowdownPot: number = 0;
  private lastShowdownSidePots: { amount: number; contenders: Player[] }[] = [];
  private lastShowdownHandRankings: Map<string, string> = new Map();

  private pendingActionResolver: ((action: string) => void) | null = null;
  private pendingActionOptions: string[] = [];
  private currentPlayerAwaitingAction: Player | null = null;
  
  private pendingAmountResolver: ((amount: number) => void) | null = null;
  private currentPlayerAwaitingAmount: Player | null = null;
  private amountRange: { min: number; max: number } = { min: 0, max: 0 };
  
  constructor(players: Player[], gameId: string, gameService: GameService, smallBlind: number = 5, bigBlind: number = 10) {
    if (players.length < 2 || players.length > 6) {
      throw new Error("This version supports between 2 and 6 players.");
    }
  
    this.players = players;
    this.deck = new Deck();
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
    this.gameService = gameService;
    this.gameId = gameId;
  }

  public getAmountRange(): { min: number; max: number } {
    return this.amountRange;
  }
  
  public getCurrentPlayerAwaitingAmount(): Player | null {
    return this.currentPlayerAwaitingAmount;
  }
  

 /* private endHand() {
    this.currentTurn = null;
    this.communityCards = [];
    this.pot += this.players.reduce((acc, p) => acc + p.currentBet, 0);
    this.players.forEach((p) => {
      p.currentBet = 0;
      p.holeCards = null;
      p.totalContributed = 0;
      p.folded = false;
      p.allIn = false;
    });
    console.log("🛑 Hand ended — pot awarded to remaining player.");
  }*/

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
  
  protected async requestPlayerAction(player: Player, options: string[]): Promise<string> {
    return new Promise((resolve) => {
      this.pendingActionResolver = resolve;
      this.pendingActionOptions = options;
      this.currentPlayerAwaitingAction = player;
    });
  }
  
  protected async requestPlayerAmount(player: Player, prompt: string, min: number, max: number): Promise<number> {
    console.log(`requestPlayerAmount called for ${player.name}: ${prompt} (min: ${min}, max: ${max})`);
  
    this.amountRange = { min, max };
    console.log(`🧠 [requestPlayerAmount] amountRange set to:`, this.amountRange);
  
    return new Promise((resolve) => {
      this.pendingAmountResolver = resolve;
      this.currentPlayerAwaitingAmount = player;
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
      console.log(`[ACTION] ${player.name} selected "${action}", awaiting amount...`);
  
      this.pendingActionPlayer = player;
      this.currentAction = action;
      this.currentPlayerAwaitingAmount = player;

      // Calculate the amount range
      if (action === "raise") {
        // Calculate minimum raise amount
        const minRaiseAmount = Math.max(
          this.lastLegalRaiseTo - this.lastBetBeforeRaise,
          this.bigBlind
        );
        const minRaiseTo = player.currentBet + minRaiseAmount;
        const maxRaise = player.stack + player.currentBet;
        
        console.log(`[RAISE LOGIC] Setting amountRange for ${player.name} — min: ${minRaiseTo}, max: ${maxRaise}`);
        console.log(`[RAISE LOGIC] lastLegalRaiseTo: ${this.lastLegalRaiseTo}`);
        console.log(`[RAISE LOGIC] lastBetBeforeRaise: ${this.lastBetBeforeRaise}`);
        console.log(`[RAISE LOGIC] currentBet: ${this.currentBet}`);
        console.log(`[RAISE LOGIC] minRaiseAmount: ${minRaiseAmount}`);
        console.log(`[RAISE LOGIC] minRaiseTo: ${minRaiseTo}, maxRaise: ${maxRaise}`);
        
        this.amountRange = { min: minRaiseTo, max: maxRaise };
      } else if (action === "bet") {
        this.amountRange = { min: this.bigBlind, max: player.stack };
      }

      // Resolve the action immediately
      const resolver = this.pendingActionResolver;
      this.pendingActionResolver = null;
      this.currentPlayerAwaitingAction = null;
      this.pendingActionOptions = [];
      resolver(action);
    } else {
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
  
    // Calculate minimum raise amount for validation
    let minAmount = this.amountRange.min;
    let maxAmount = this.amountRange.max;

    if (this.currentAction === "raise") {
      // For preflop, the minimum raise is to 2x the big blind
      if (this.communityCards.length === 0) {
        minAmount = this.bigBlind * 2;
      } else {
        // For other streets, minimum raise is the last raise amount or big blind, whichever is larger
        const minRaiseAmount = Math.max(
          this.lastLegalRaiseTo - this.lastBetBeforeRaise,
          this.bigBlind
        );
        minAmount = player.currentBet + minRaiseAmount;
      }
      console.log(`[RAISE VALIDATION] Minimum raise to: ${minAmount}`);

      // Special case: If player is going all-in but can't make the minimum raise,
      // allow it as long as they're putting in more than the current bet
      if (amount === player.stack + player.currentBet && amount > this.currentBet) {
        console.log(`[RAISE VALIDATION] Allowing all-in raise below minimum: ${amount}`);
        this.pendingAmountResolver(amount);
        return;
      }
    }
  
    if (amount < minAmount || amount > maxAmount) {
      console.warn(`Invalid amount: ${amount}. Must be between ${minAmount} and ${maxAmount}`);
      return;
    }
  
    console.log(`[HANDLE AMOUNT] ${player.name} entered ${amount}`);
    console.log(`[DEBUG] Resolving amount for ${this.currentAction}`);
    const raiseAmount = Math.min(amount - this.currentBet, player.stack);
    this.lastLegalRaiseTo = this.currentBet + raiseAmount;
    player.stack -= raiseAmount;
    player.currentBet += raiseAmount;
    player.totalContributed += raiseAmount;
    this.pot += raiseAmount;
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

  public async startHand() {
    // Reset any residual async state from prior hand
    this.pendingActionResolver = null;
    this.pendingAmountResolver = null;
    this.currentPlayerAwaitingAction = null;
    this.currentPlayerAwaitingAmount = null;
    this.pendingActionOptions = [];
    this.amountRange = { min: 0, max: 0 };

    // Now we filter out players with zero stack when starting a new hand
    this.players = this.players.filter(p => p.stack > 0);
    
    this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
    const rotated = [...this.players.slice(this.dealerIndex), ...this.players.slice(0, this.dealerIndex)];
    this.players = rotated;
    this.dealerIndex = 0;
  
    console.log(`\n💥 Starting Hand (Dealer: ${this.players[0].name})`);
    this.communityCards = [];
    this.pot = 0;
    this.sidePots = []; // Reset side pots at the beginning of the hand
    this.lastShowdownPot = 0; // Reset last showdown pot
    this.lastShowdownSidePots = []; // Reset last showdown side pots
    this.deck.reset();
    this.isShowdown = false; // Reset showdown flag at the start of each hand
  
    this.players.forEach(p => p.resetForNextHand());
    this.players.forEach(p => p.receiveCards(this.deck.deal(2)));
  
    console.log("Hole cards dealt.");

    // Calculate blind positions
    const sbIndex = (this.dealerIndex + 1) % this.players.length;
    const bbIndex = (this.dealerIndex + 2) % this.players.length;

    // Post blinds
    this.postBlinds();

    // Create the hand record in the database
    const handNumber = await this.gameService.getNextHandNumber(this.gameId);
    const hand = await this.gameService.createHand(this.gameId, handNumber, {
      communityCards: [],
      pot: this.pot,
      sidePots: [],
      currentBet: this.currentBet,
      dealerIndex: this.dealerIndex,
      playerStates: this.players.map(p => ({
        id: p.id,
        name: p.name,
        stack: p.stack,
        currentBet: p.currentBet,
        totalContributed: p.totalContributed,
        folded: p.folded,
        allIn: p.allIn,
        holeCards: p.holeCards
      })),
      isShowdown: false,
      round: BettingRound.PREFLOP,
      sbIndex,
      bbIndex
    });
    this.currentHandId = hand.id;
    await this.gameService.updateHandRound(this.currentHandId, BettingRound.PREFLOP);
    console.log("✅ Updated hand state to PREFLOP");

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

  async dealFlop() {
    const flop = this.deck.deal(3);
    this.communityCards.push(...flop);
    console.log(`Flop: ${flop.map(card => card.toString()).join(' ')}`);

    if (this.currentHandId) {
      try {
        await this.gameService.updateHandRound(this.currentHandId, BettingRound.FLOP);
        console.log("✅ Updated hand state to FLOP");
      } catch (err) {
        console.error("❌ Failed to update FLOP round in DB", err);
      }
    }
  }

  async dealTurn() {
    const turn = this.deck.deal(1);
    this.communityCards.push(...turn);
    console.log(`Turn: ${turn[0].toString()}`);

    if (this.currentHandId) {
      try {
        await this.gameService.updateHandRound(this.currentHandId, BettingRound.TURN);
        console.log("✅ Updated hand state to TURN");
      } catch (err) {
        console.error("❌ Failed to update TURN round in DB", err);
      }
    }
  }

  async dealRiver() {
    const river = this.deck.deal(1);
    this.communityCards.push(...river);
    console.log(`River: ${river[0].toString()}`);

    if (this.currentHandId) {
      try {
        await this.gameService.updateHandRound(this.currentHandId, BettingRound.RIVER);
        console.log("✅ Updated hand state to RIVER");
      } catch (err) {
        console.error("❌ Failed to update RIVER round in DB", err);
      }
    }
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

  async showdown() {
    const board = this.getCommunityCards();
    const playersInShowdown = this.players.filter(p => !p.folded && p.holeCards.length > 0);
  
    // Make sure side pots are updated
    this.rebuildSidePots();
    
    // Store the final pot amounts before distribution
    this.lastShowdownPot = this.pot;
    this.lastShowdownSidePots = [...this.sidePots];
    
    if (this.sidePots.length === 0) {
      // If no side pots were created, make a main pot with all chips
      this.sidePots.push({
        amount: this.pot,
        contenders: [...playersInShowdown]
      });
      this.lastShowdownSidePots = [...this.sidePots];
    }
  
    // Clear previous rankings
    this.lastShowdownHandRankings.clear();
  
    // Evaluate hands
    const handResults = new Map<Player, ReturnType<typeof HandEvaluator.evaluateBestHand>>();
    for (const player of playersInShowdown) {
      const fullHand = [...player.holeCards, ...board];
      console.log(`[Showdown Debug] Player: ${player.name}, Hole Cards: ${player.holeCards.map(c=>c.toString())}, Board: ${board.map(c=>c.toString())}, Full Hand Length: ${fullHand.length}`);
      const best = HandEvaluator.evaluateBestHand(fullHand);
      handResults.set(player, best);
      // Store the hand description for the game state
      this.lastShowdownHandRankings.set(player.name, describeHand(best));
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
    
    // Don't reset the pot here anymore - we'll use lastShowdownPot for display
    this.displayChipCounts();

    // Set showdown flag to true
    this.isShowdown = true;

    // Update hand round in DB
    if (this.currentHandId) {
      try {
        await this.gameService.updateHandRound(this.currentHandId, BettingRound.SHOWDOWN);
        console.log("✅ Updated hand state to SHOWDOWN");
      } catch (err) {
        console.error("❌ Failed to update SHOWDOWN round in DB", err);
      }
    }
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
    
    // Initialize raise tracking variables
    this.lastBetBeforeRaise = roundName === 'Preflop' ? this.bigBlind : 0;
    this.lastLegalRaiseTo = roundName === 'Preflop' ? this.bigBlind * 2 : 0;
    this.lastRaiseTo = roundName === 'Preflop' ? this.bigBlind * 2 : 0;
    this.lastBetAmount = roundName === 'Preflop' ? this.bigBlind : 0;

    // Current player index
    let currentIndex = 0;
    
    // Keep betting until all active players have acted and bets are matched
    let roundComplete = false;
    
    let wasShortRaise = false;
    let lastLegalAggressor: Player | null = null;
    
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
        if (player.stack > toCall) {
          // Allow raise if player has enough chips and either:
          // 1. There was no short raise, or
          // 2. There was a valid raise after the short raise
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
          this.bigBlind,  // Post-flop minimum bet is always the big blind
            player.stack
          );
  
        player.stack -= amount;
        player.currentBet += amount;
        player.totalContributed += amount;
        this.pot += amount;
  
        // When someone makes a bet post-flop, we need to set up the raise tracking properly
        this.lastBetBeforeRaise = 0;  // There was no bet before this one
        this.lastRaiseTo = amount;    // This is the amount that needs to be matched
        this.lastLegalRaiseTo = amount;
        this.lastBetAmount = amount;  // Track the bet amount for future raise calculations
        currentBet = amount;
        
        lastAggressor = player;
        lastLegalAggressor = player;
        wasShortRaise = false;
        isAggressiveAction = true;
        
        // Reset decisions for all other players
        player.hasMadeDecisionThisRound = 1;
        activePlayers.forEach(p => {
          if (p !== player) p.hasMadeDecisionThisRound = 0;
        });
        
        console.log(`${player.name} bets ${amount}.`);
        console.log(`[BET LOGIC] Setting lastLegalRaiseTo to ${amount} for future raise calculations`);
    } else if (action === 'raise') {
        // For post-flop, minimum raise is the size of the previous bet/raise
      const minRaiseAmount = Math.max(this.lastLegalRaiseTo - this.lastBetBeforeRaise, this.bigBlind);
        const minRaiseTo = currentBet + minRaiseAmount;
      
        const maxRaise = player.stack + player.currentBet;
        
        console.log(`[RAISE LOGIC] Current bet: ${currentBet}`);
        console.log(`[RAISE LOGIC] Last legal raise to: ${this.lastLegalRaiseTo}`);
        console.log(`[RAISE LOGIC] Last bet before raise: ${this.lastBetBeforeRaise}`);
        console.log(`[RAISE LOGIC] Min raise amount: ${minRaiseAmount}`);
        console.log(`[RAISE LOGIC] Min raise to: ${minRaiseTo}`);
        console.log(`[RAISE LOGIC] Max raise: ${maxRaise}`);
        
        // Request the raise amount
      const raiseTo = await this.requestPlayerAmount(
        player,
        `Raise to (min ${minRaiseTo}, max ${maxRaise})`,
        minRaiseTo,
        maxRaise
      );
      
      const intendedRaiseAmount = raiseTo - player.currentBet;
      const actualRaiseAmount = Math.min(intendedRaiseAmount, player.stack);
      const actualRaiseTo = player.currentBet + actualRaiseAmount;

      player.stack -= actualRaiseAmount;
      player.currentBet += actualRaiseAmount;
      player.totalContributed += actualRaiseAmount;
      this.pot += actualRaiseAmount;
      
      if (player.stack === 0) {
        console.log(`[RAISE LOGIC] ${player.name} attempted to raise to ${raiseTo}, but actual raise is to ${actualRaiseTo}.`);
        // Check if this is a short all-in
        if (actualRaiseAmount >= minRaiseAmount) {
          wasShortRaise = false;
          this.lastLegalRaiseTo = actualRaiseTo;
          this.lastBetBeforeRaise = currentBet;
          console.log(`[RAISE LOGIC] Valid all-in raise, updating last legal raise to ${actualRaiseTo}`);
        } else {
          wasShortRaise = true;
          console.log(`[RAISE LOGIC] Short all-in detected, keeping last legal raise at ${this.lastLegalRaiseTo}`);
        }
      } else {
        console.log(`[RAISE LOGIC] ${player.name} attempted to raise to ${raiseTo}, but actual raise is to ${actualRaiseTo}.`);
        if (actualRaiseAmount >= minRaiseAmount) {
          wasShortRaise = false;
          this.lastLegalRaiseTo = actualRaiseTo;
          this.lastBetBeforeRaise = currentBet;
          console.log(`[RAISE LOGIC] Valid raise, updating last legal raise to ${actualRaiseTo}`);
        } else {
          wasShortRaise = true;
          console.log(`[RAISE LOGIC] Short raise detected, keeping last legal raise at ${this.lastLegalRaiseTo}`);
        }
      }
      
      lastAggressor = player;
      this.lastRaiseTo = actualRaiseTo;
      currentBet = actualRaiseTo;
      
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
      // Use the current pot or last showdown pot based on showdown state
      pot: this.isShowdown ? this.lastShowdownPot : this.pot,
      sidePots: (this.isShowdown ? this.lastShowdownSidePots : this.sidePots).map(pot => ({
        amount: pot.amount,
        contenders: pot.contenders.map(p => p.id)
      })),
      players: this.players.map(player => ({
        id: player.id,
        name: player.name,
        stack: player.stack,
        currentBet: player.currentBet,
        totalContributed: player.totalContributed,
        folded: player.folded,
        allIn: player.stack === 0,
        holeCards: (this.isShowdown && !player.folded)
          ? player.holeCards.map(card => ({ suit: card.suit, rank: card.rank }))
          : [],
        handRanking: this.isShowdown && !player.folded 
          ? this.lastShowdownHandRankings.get(player.name) || null
          : null
      })),
      currentTurn: this.currentPlayerAwaitingAction?.name ?? null,
      validActions: this.currentPlayerAwaitingAction
        ? this.pendingActionOptions
        : [],
      dealerIndex: this.dealerIndex,
      showdown: this.isShowdown
    };
  
    return state;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public calculateAmountRange(player: Player): { min: number; max: number } {
    const bets = this.players.map(p => ({
      bet: p.currentBet,
      isAllIn: p.stack === 0,
      name: p.name
    })).sort((a, b) => b.bet - a.bet);

    const highestBet = bets[0].bet;
    
    // If no bets yet, minimum is BB
    if (highestBet === 0) {
      return {
        min: Math.min(this.bigBlind, player.stack),
        max: player.stack
      };
    }

    // If only blinds are posted (preflop)
    if (highestBet === this.bigBlind && this.players.some(p => p.currentBet === this.smallBlind)) {
      return {
        min: Math.min(this.bigBlind * 2, player.stack),
        max: player.stack
      };
    }

    // Calculate minimum raise based on the last legal raise
    const minRaiseAmount = Math.max(this.lastLegalRaiseTo - this.lastBetBeforeRaise, this.bigBlind);

    // Check if the current highest bet is from a short all-in
    const isHighestBetShortAllIn = this.players.some(p => 
      p.currentBet === highestBet && 
      p.stack === 0 && 
      (highestBet - this.lastBetBeforeRaise) < minRaiseAmount
    );

    // If highest bet is a short all-in, minimum is lastLegalRaiseTo
    // Otherwise, need to raise by at least minRaiseAmount over lastLegalRaiseTo
    const minRaiseTo = isHighestBetShortAllIn 
      ? this.lastLegalRaiseTo 
      : this.lastLegalRaiseTo + minRaiseAmount;

    console.log(`[AMOUNT RANGE] Highest bet: ${highestBet}`);
    console.log(`[AMOUNT RANGE] Last legal raise to: ${this.lastLegalRaiseTo}`);
    console.log(`[AMOUNT RANGE] Last bet before raise: ${this.lastBetBeforeRaise}`);
    console.log(`[AMOUNT RANGE] Min raise amount: ${minRaiseAmount}`);
    console.log(`[AMOUNT RANGE] Is highest bet short all-in: ${isHighestBetShortAllIn}`);
    console.log(`[AMOUNT RANGE] Min raise to: ${minRaiseTo}`);

    return {
      min: Math.min(minRaiseTo, player.stack),
      max: player.stack
    };
  }

  public getCurrentHandId(): string | null {
    return this.currentHandId;
  }
}