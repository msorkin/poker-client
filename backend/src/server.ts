import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PokerGame } from './POkerGame';
import { PokerGameController } from './PokerGameController';
import { Player } from './Player';
import { PrismaClient } from '@prisma/client';
import { GameService } from './services/game.service';
import { GameRecoveryService } from './services/game-recovery.service';
import { GameManager } from './services/game-manager.service';
import gamesRouter from './routes/games.router';

//Print which DB we're using
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Load environment variables
dotenv.config();

// Define the User type based on our schema
type User = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

const prisma = new PrismaClient();
const gameService = new GameService();
const gameRecoveryService = new GameRecoveryService();

// --- Create Server ---
const app = express();
app.use(cors());
app.use(express.json());

// Map to store active game instances
let activeGames = new Map<string, { game: PokerGame; controller: PokerGameController }>();

// Recover active games on startup
(async () => {
  try {
    activeGames = await gameRecoveryService.recoverActiveGames();
    console.log(`Recovered ${activeGames.size} active games`);
  } catch (error) {
    console.error('Failed to recover active games:', error);
  }
})();

// Routes
app.use('/games', gamesRouter);

// Helper to get or load a PokerGame instance
async function getOrLoadPokerGame(gameId: string): Promise<{ game: PokerGame; controller: PokerGameController } | null> {
  let activeGame = activeGames.get(gameId);
  if (activeGame) return activeGame;
  const gameData = await GameManager.getInstance().getGameById(gameId);
  if (!gameData) return null;
  console.log('gameData loaded from DB:', gameData);

  // Transform DB sessions to Player instances
  const players = gameData.sessions.map((session: any) =>
    new Player(session.player.id, session.player.username, session.stack)
  );

  // Pass the correct arguments to PokerGame
  const pokerGame = new PokerGame(players, gameData.smallBlind, gameData.bigBlind);
  const controller = new PokerGameController(pokerGame, 7);
  activeGames.set(gameId, { game: pokerGame, controller });
  return { game: pokerGame, controller };
}

// --- API Routes ---

// Create a new game
app.post('/games', async (req: Request, res: Response) => {
  try {
    const { playerIds, maxSeats = 6 } = req.body;
    
    if (!playerIds || !Array.isArray(playerIds)) {
      return res.status(400).json({ error: 'Invalid playerIds format' });
    }

    // Validate maxSeats
    if (maxSeats < 2 || maxSeats > 9) {
      return res.status(400).json({ error: 'maxSeats must be between 2 and 9 inclusive' });
    }

    // Validate number of players
    if (playerIds.length < 2 || playerIds.length > maxSeats) {
      return res.status(400).json({ error: `Invalid number of players. Must be between 2 and ${maxSeats}.` });
    }

    // Get players from database
    const dbPlayers = await prisma.user.findMany({
      where: {
        id: {
          in: playerIds
        }
      }
    }) as User[];

    if (dbPlayers.length !== playerIds.length) {
      return res.status(400).json({ error: 'One or more players not found' });
    }

    // Create Player instances for the game
    const players = dbPlayers.map((dbPlayer: User) => 
      new Player(dbPlayer.id, dbPlayer.username, 1000) // Starting stack of 1000
    );

    // Create game in database
    const dbGame = await gameService.createGame(players, 5, 10, 10, maxSeats);

    // Create in-memory game instance
    const game = new PokerGame(players, dbGame.smallBlind, dbGame.bigBlind);
    const controller = new PokerGameController(game, 7);

    // Store in active games map
    activeGames.set(dbGame.id, { game, controller });

    res.status(201).json({
      gameId: dbGame.id,
      players: dbPlayers.map((p: User) => ({ id: p.id, username: p.username }))
    });
  } catch (err) {
    console.error('Failed to create game:', err);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Get game state
app.get('/games/:gameId/state/:playerId', async (req: Request, res: Response) => {
  try {
    const { gameId, playerId } = req.params;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    const state = controller.getUIState(playerId);
    res.json(state);
  } catch (err) {
    console.error('Failed to get game state:', err);
    res.status(500).json({ error: 'Failed to get game state' });
  }
});

// Start a game
app.post('/games/:gameId/start', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    await gameService.updateGameStatus(gameId, 'IN_PROGRESS');
    pokerGame.startHand();
    (async () => {
      try {
        await pokerGame.bettingRound("Preflop");
        let remaining = pokerGame.getActivePlayers();
        if (remaining.length <= 1) {
          console.log("🏆 Only one player left — hand ends.");
          return;
        }
        pokerGame.dealFlop();
        await pokerGame.bettingRound("Flop");
        pokerGame.dealTurn();
        await pokerGame.bettingRound("Turn");
        pokerGame.dealRiver();
        await pokerGame.bettingRound("River");
        pokerGame.showdown();
        const gameState = pokerGame.getGameState();
        await gameService.createHand(gameId, 1, {
          communityCards: gameState.communityCards,
          pot: gameState.pot,
          sidePots: gameState.sidePots,
          currentBet: gameState.players.reduce((max, p) => Math.max(max, p.currentBet), 0),
          dealerIndex: 0,
          playerStates: gameState.players.map(p => ({
            id: p.id,
            name: p.name,
            stack: p.stack,
            currentBet: p.currentBet,
            totalContributed: p.totalContributed,
            folded: p.folded,
            allIn: p.allIn,
            holeCards: p.holeCards
          })),
          isShowdown: gameState.showdown || false
        });
      } catch (err) {
        console.error("Game loop error:", err);
      }
    })();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to start game:', err);
    res.status(500).json({ error: 'Failed to start game' });
  }
});

// Handle player disconnection
app.post('/games/:gameId/leave', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { playerId } = req.body;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    await gameService.removePlayerFromTable(gameId, playerId);
    const activePlayerCount = await gameService.getActivePlayerCount(gameId);
    if (activePlayerCount === 0) {
      activeGames.delete(gameId);
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to handle player leave:', err);
    res.status(500).json({ error: 'Failed to handle player leave' });
  }
});

// Admin endpoint to force close a table
app.post('/admin/games/:gameId/close', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    await gameService.forceCloseTable(gameId);
    activeGames.delete(gameId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to force close table:', err);
    res.status(500).json({ error: 'Failed to force close table' });
  }
});

// Handle player action
app.post('/games/:gameId/action', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { playerId, action } = req.body;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    const player = pokerGame.getPlayers().find(p => p.id === playerId);
    if (!player) {
      return res.status(400).json({ error: 'Player not found in game' });
    }
    pokerGame.handleAction(player, action);
    await gameRecoveryService.syncGameState(gameId, pokerGame);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to handle action:', err);
    res.status(500).json({ error: 'Failed to handle action' });
  }
});

// Handle amount input
app.post('/games/:gameId/amount', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { playerId, amount } = req.body;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    const player = pokerGame.getPlayers().find(p => p.id === playerId);
    if (!player) {
      return res.status(400).json({ error: 'Player not found in game' });
    }
    pokerGame.handleAmount(player, amount);
    await gameRecoveryService.syncGameState(gameId, pokerGame);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to handle amount:', err);
    res.status(500).json({ error: 'Failed to handle amount' });
  }
});

// Get amount range for a player
app.get('/games/:gameId/amount-range/:playerId', async (req: Request, res: Response) => {
  try {
    const { gameId, playerId } = req.params;
    const result = await getOrLoadPokerGame(gameId);
    if (!result) return res.status(404).json({ error: 'Game not found' });
    const { game: pokerGame, controller } = result;
    const player = pokerGame.getPlayers().find(p => p.id === playerId);
    if (!player) {
      return res.status(400).json({ error: 'Player not found in game' });
    }
    const range = pokerGame.calculateAmountRange(player);
    res.json({ ready: true, range });
  } catch (err) {
    console.error('Failed to get amount range:', err);
    res.status(500).json({ error: 'Failed to get amount range' });
  }
});

// --- User CRUD Endpoints ---

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
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});