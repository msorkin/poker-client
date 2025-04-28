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
  new Player('4', 'Diana', 60),
  new Player('5', 'Eddie', 15),
  new Player('6', 'Fiona', 60),
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
        // Remove automatic next hand start - will be triggered by /next-hand endpoint
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

// Add new endpoint for starting next hand
app.post('/next-hand', async (req: Request, res: Response) => {
  try {
    console.log("🔄 Starting next hand");
    
    // Reset showdown state and start next hand
    game.startHand();
    
    // Kick off async game loop for next hand
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
      } catch (err) {
        console.error("Game loop error:", err);
      }
    })();

    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Failed to start next hand:', err);
    res.status(500).send('Failed to start next hand');
  }
});

app.get('/amount-range/:playerId', (req: express.Request, res: express.Response) => {
  const { playerId } = req.params;
  
  // Get the actual Player instance from the game
  const player = game.getPlayers().find((p: Player) => p.id === playerId);
  if (!player) {
    return res.json({ ready: false });
  }

  // Use the game's amount range calculation
  const range = game.calculateAmountRange(player);
  
  return res.json({
    ready: true,
    range
  });
});

// --- Start Server ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Poker server running at http://localhost:${PORT}`);
});