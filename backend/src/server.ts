import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { PokerGame } from './POkerGame';
import { PokerGameController } from './PokerGameController';
import { Player } from './Player';
import { PrismaClient } from '../../prisma/node_modules/@prisma/client';

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

const prisma = new PrismaClient();

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

// --- User CRUD Endpoints (DB-backed, does NOT affect in-memory game logic) ---

// Create user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;
    if (!username || !email || !passwordHash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });
    res.status(201).json(user);
  } catch (err: any) {
    if (err.code === 'P2002') {
      // Unique constraint failed
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { username, email, passwordHash },
    });
    res.json(user);
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// --- Start Server ---
const PORT = 3001;

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Poker server running at http://localhost:${PORT}`);
  });
}

export { app };