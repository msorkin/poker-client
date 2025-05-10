import { prisma } from '../lib/prisma';
import { GameManager } from '../services/game-manager.service';
import { Game } from '@prisma/client';

describe('getGameById', () => {
  let testGame: Game;

  beforeEach(async () => {
    testGame = await prisma.game.create({
      data: {
        status: 'WAITING',
        smallBlind: 5,
        bigBlind: 10,
        minBuyIn: 100,
        maxBuyIn: 1000,
        maxHands: 10,
        maxSeats: 6,
        currentHand: 0,
        dealerIndex: 0,
      },
    });
  });

  afterEach(async () => {
    await prisma.transactionRecord.deleteMany({ where: { gameId: testGame.id } });
    await prisma.tableSession.deleteMany({ where: { gameId: testGame.id } });
    await prisma.hand.deleteMany({ where: { gameId: testGame.id } });
    await prisma.game.deleteMany({ where: { id: testGame.id } });
  });

  test('should return the game for a valid ID', async () => {
    const game = await GameManager.getInstance().getGameById(testGame.id);
    expect(game).not.toBeNull();
    expect(game?.id).toBe(testGame.id);
    expect(game?.status).toBe('WAITING');
    expect(game?.smallBlind).toBe(5);
    expect(game?.bigBlind).toBe(10);
  });

  test('should return null for an invalid ID', async () => {
    const game = await GameManager.getInstance().getGameById('nonexistent-id-123');
    expect(game).toBeNull();
  });
});
