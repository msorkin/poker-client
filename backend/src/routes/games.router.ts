import { Router } from 'express';
import { GameManager } from '../services/game-manager.service';
import { GameNotFoundError } from '../errors/game-errors';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

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

/**
 * @route PATCH /games/:gameId
 * @desc Update config fields for a WAITING game
 * @access Public (for now)
 */
router.patch('/:gameId', async (req, res) => {
  const { gameId } = req.params;
  const allowedFields = ['smallBlind', 'bigBlind', 'minBuyIn', 'maxBuyIn', 'maxSeats'];
  const updateData: Record<string, any> = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  try {
    const game = await GameManager.getInstance().getGameById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (game.status !== 'WAITING') {
      return res.status(400).json({ error: 'Only waiting games can be updated.' });
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update.' });
    }
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: updateData,
    });
    res.json(updatedGame);
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: err.message });
    }
    console.error('Error updating game:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @route DELETE /games/:gameId
 * @desc Delete a WAITING game
 * @access Public (for now)
 */
router.delete('/:gameId', async (req, res) => {
  const { gameId } = req.params;
  try {
    const game = await GameManager.getInstance().getGameById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (game.status !== 'WAITING') {
      return res.status(400).json({ error: 'Only WAITING games can be deleted' });
    }
    if (game.sessions.length > 0) {
      return res.status(400).json({ error: 'Cannot delete a game that has active player sessions' });
    }
    // TODO: Add confirmation modal in frontend before triggering this DELETE request
    await prisma.game.delete({ where: { id: gameId } });
    return res.json({ success: true });
  } catch (err: any) {
    if (err.code === 'P2025') {
      // Record not found
      return res.status(404).json({ error: 'Game not found' });
    }
    if (err.name === 'PrismaClientKnownRequestError') {
      console.error('Prisma error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.error('Error deleting game:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router; 