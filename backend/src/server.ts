import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { PokerGame } from './POkerGame';
import { PokerGameController } from './PokerGameController';
import { Player } from './Player';

// --- Create Players and Game ---
const players: Player[] = [
  new Player('1', 'Alice', 1000),
  new Player('2', 'Bob', 1000),
  new Player('3', 'Charlie', 1000),
  new Player('4', 'Diana', 45),
  new Player('5', 'Eddie', 1000),
  new Player('6', 'Fiona', 45),
];

const game = new PokerGame(players, 5, 10);
const controller = new PokerGameController(game, 7);

// Add this where other variables are defined
const games = new Map<string, PokerGame>();

// --- Create Server ---
const app = express();
app.use(cors());
app.use(express.json());

let isGameRunning = false;

// --- API Routes ---
app.get('/state/:playerId', (req: Request, res: Response) => {
  const playerId = req.params.playerId;
  const state = controller.getUIState(playerId);
  res.json(state);
});

app.post('/action', (req: Request, res: Response) => {
  const { playerId, action } = req.body;
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    res.status(400).send('Invalid player');
    return;
  }

  game.handleAction(player, action);
  res.sendStatus(200);
});

app.post('/amount', (req: Request, res: Response) => {
  const { playerId, amount } = req.body;
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    res.status(400).send('Invalid player');
    return;
  }

  game.handleAmount(player, amount);
  res.sendStatus(200);
});

app.post('/start', async (req: Request, res: Response) => {
  try {
    console.log("🔥 /start called");

    game.startHand();

    // Kick off async game loop
    (async () => {
      try {
        await game.bettingRound("Preflop");

        let remaining = game.getActivePlayers();
        if (remaining.length <= 1) {
          console.log("🏆 Only one player left — hand ends.");
          return;
        }

        game.dealFlop();
        await game.bettingRound("Flop");

        game.dealTurn();
        await game.bettingRound("Turn");

        game.dealRiver();
        await game.bettingRound("River");

        game.showdown();

        // Wait a bit to show the showdown
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Start next hand
        game.startHand();
        await game.bettingRound("Preflop");

        remaining = game.getActivePlayers();
        if (remaining.length <= 1) {
          console.log("🏆 Only one player left — hand ends.");
          return;
        }

        game.dealFlop();
        await game.bettingRound("Flop");

        game.dealTurn();
        await game.bettingRound("Turn");

        game.dealRiver();
        await game.bettingRound("River");

        game.showdown();
      } catch (err) {
        console.error("Game loop error:", err);
      }
    })();

    // Send response immediately (non-blocking)
    res.status(200).send({ success: true });

  } catch (err) {
    console.error('Game crashed:', err);
    res.status(500).send('Server crashed');
  }
});

app.get('/amount-range/:playerId', (req: express.Request, res: express.Response) => {
  const { playerId } = req.params;
  
  const gameState = game.getGameState();
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) {
    return res.json({ ready: false });
  }

  // Get all bets and sort them in descending order
  const bets = gameState.players
    .map(p => ({ 
      bet: p.currentBet || 0,
      stack: p.stack,
      totalChips: (p.currentBet || 0) + p.stack,
      isAllIn: p.stack === 0 && (p.currentBet || 0) > 0
    }))
    .sort((a, b) => b.bet - a.bet);

  const highestBet = Math.max(...bets.map(b => b.bet));

  // Special case for initial preflop raise (when highest bet is the BB)
  if (highestBet === 10 && bets.find(b => b.bet === 5)) {
    return res.json({
      ready: true,
      range: {
        min: Math.min(20, player.stack),
        max: player.stack
      }
    });
  }

  // Find the last valid raise amount
  let lastValidRaiseAmount = 0;

  // If there's a bet higher than the big blind, calculate the raise amount
  if (highestBet > 10) {
    // Find the bet that was raised over, ignoring all-in bets
    const validBets = bets
      .filter(b => !b.isAllIn && b.bet > 0 && b.bet < highestBet)
      .sort((a, b) => b.bet - a.bet);
      
    // If no valid previous bets found (except all-ins), use the big blind
    const previousBet = validBets[0]?.bet || 10;
    lastValidRaiseAmount = highestBet - previousBet;
  } else {
    // Default to 2x BB for first raise
    lastValidRaiseAmount = 20;
  }

  // For a raise, we need to raise by at least the same amount as the last raise
  const minRaise = highestBet + lastValidRaiseAmount;

  return res.json({
    ready: true,
    range: {
      min: Math.min(minRaise, player.stack),
      max: player.stack
    }
  });
});

// --- Start Server ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Poker server running at http://localhost:${PORT}`);
});