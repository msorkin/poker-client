import { Router } from 'express';
import { GameManager } from '../services/game-manager.service';
import { GameNotFoundError } from '../errors/game-errors';

const router = Router();

/**
 * @route GET /games
 * @desc Get list of waiting poker games
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const games = await GameManager.getInstance().listWaitingGames();
    res.json(games);
  } catch (err) {
    console.error('Error fetching waiting games:', err);

    if (err instanceof GameNotFoundError) {
      return res.status(404).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router; 