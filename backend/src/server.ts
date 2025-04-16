import express from 'express';
import type { Request, Response } from 'express';
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
    if (isGameRunning) {
      res.status(400).send('Game already running');
      return;
    }
  
    isGameRunning = true;
    try {
      await controller.run();
      res.send('Game finished');
    } catch (err) {
      console.error('Game crashed:', err);
      res.status(500).send('Server crashed');
    } finally {
      isGameRunning = false;
    }
  });

// --- Start Server ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Poker server running at http://localhost:${PORT}`);
});