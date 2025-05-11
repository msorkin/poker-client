import { prisma } from '../lib/prisma';
import { BuyInManager } from '../services/buy-in.service';
import { GameManager } from '../services/game-manager.service';
import {
  InvalidBuyInAmountError,
  InsufficientBalanceError,
  PlayerAlreadySeatedError,
  GameNotFoundError,
  PlayerNotFoundError,
} from '../errors/game-errors';

describe('BuyInManager - Buy-In Flow', () => {
  let user: any;
  let game: any;
  let buyInManager: BuyInManager;

  beforeEach(async () => {
    // Clean up all relevant tables
    await prisma.transactionRecord.deleteMany();
    await prisma.tableSession.deleteMany();
    await prisma.hand.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();

    // Create a user with sufficient balance
    user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: 'hashed',
        balance: 1000,
      },
    });

    // Create a game with minBuyIn: 100, maxBuyIn: 1000
    game = await prisma.game.create({
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

    buyInManager = new BuyInManager();
  });

  afterEach(async () => {
    await prisma.transactionRecord.deleteMany();
    await prisma.tableSession.deleteMany();
    await prisma.hand.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();
  });

  test('Successful Buy-In', async () => {
    const buyInAmount = 500;
    await buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount);

    // TableSession is created
    const session = await prisma.tableSession.findFirst({ where: { gameId: game.id, playerId: user.id } });
    expect(session).not.toBeNull();
    expect(session?.stack).toBe(buyInAmount);

    // User balance is reduced
    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.balance).toBe(1000 - buyInAmount);

    // TransactionRecord is created
    const tx = await prisma.transactionRecord.findFirst({ where: { userId: user.id, gameId: game.id } });
    expect(tx).not.toBeNull();
    expect(tx?.type).toBe('BUYIN');
    expect(tx?.amount).toBe(buyInAmount);
  });

  test('Buy-In Below Minimum', async () => {
    const buyInAmount = 50; // less than minBuyIn
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).rejects.toThrow(InvalidBuyInAmountError);
  });

  test('Buy-In Above Maximum', async () => {
    const buyInAmount = 2000; // more than maxBuyIn
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).rejects.toThrow(InvalidBuyInAmountError);
  });

  test('Buy-In Exactly at Minimum', async () => {
    const buyInAmount = game.minBuyIn; // 100
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).resolves.not.toThrow();
  
    const session = await prisma.tableSession.findFirst({ where: { gameId: game.id, playerId: user.id } });
    expect(session?.stack).toBe(buyInAmount);
  });
  
  test('Buy-In Exactly at Maximum', async () => {
    // Reset state
    await prisma.tableSession.deleteMany({ where: { gameId: game.id, playerId: user.id } });
    await prisma.transactionRecord.deleteMany({ where: { gameId: game.id, userId: user.id } });
  
    const buyInAmount = game.maxBuyIn; // 1000
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).resolves.not.toThrow();
  
    const session = await prisma.tableSession.findFirst({ where: { gameId: game.id, playerId: user.id } });
    expect(session?.stack).toBe(buyInAmount);
  });

  test('Insufficient Balance', async () => {
    // Set user balance to 50
    await prisma.user.update({ where: { id: user.id }, data: { balance: 50 } });
    const buyInAmount = 100;
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).rejects.toThrow(InsufficientBalanceError);
  });

  test('Already Seated', async () => {
    const buyInAmount = 200;
    // First buy-in should succeed
    await buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount);
    // Second buy-in should fail
    await expect(
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    ).rejects.toThrow(PlayerAlreadySeatedError);
  });

  test('Nonexistent Game ID throws GameNotFoundError', async () => {
    const fakeGameId = 'nonexistent-game-id';
    const buyInAmount = 200;
    await expect(
      buyInManager.processInitialBuyIn(fakeGameId, user.id, buyInAmount)
    ).rejects.toThrow(GameNotFoundError);
  });

  test('Nonexistent User ID throws PlayerNotFoundError', async () => {
    const fakeUserId = 'nonexistent-user-id';
    const buyInAmount = 200;
    await expect(
      buyInManager.processInitialBuyIn(game.id, fakeUserId, buyInAmount)
    ).rejects.toThrow(PlayerNotFoundError);
  });
});
