import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { GameManager } from './game-manager.service';
import { GameNotFoundError, PlayerNotFoundError, InsufficientBalanceError, PlayerAlreadySeatedError, NoSeatsAvailableError } from '../errors/game-errors';

////////////////////////////////////////

// Define transaction types as const for type safety
const TransactionType = {
  BUYIN: 'BUYIN' as const,
  CASHOUT: 'CASHOUT' as const,
  REBUY: 'REBUY' as const
} as const;

// Maximum number of retries for seat allocation
const MAX_SEAT_RETRIES = 3;

export class BuyInManager {
  private gameManager: GameManager;

  constructor() {
    this.gameManager = GameManager.getInstance();
  }

  /**
   * Validates if a buy-in amount is within the game's limits
   * @param gameId The ID of the game
   * @param amount The amount to buy in for
   * @returns boolean indicating if the buy-in is valid
   * @throws Error if game is not found
   */
  async validateBuyIn(gameId: string, amount: number): Promise<boolean> {
    try {
      const game = await this.gameManager.getGameById(gameId);
      if (!game) {
        throw new GameNotFoundError(gameId);
      }

      // Check if we're using default values (shouldn't happen due to schema defaults)
      if (game.minBuyIn === 100 || game.maxBuyIn === 1000) {
        console.warn(`Using default buy-in limits for game ${gameId}. This may indicate a database issue.`);
      }

      return amount >= game.minBuyIn && amount <= game.maxBuyIn;
    } catch (error) {
      console.error('Failed to validate buy-in:', error);
      throw error;
    }
  }

  /**
   * Processes an initial buy-in for a player
   * @param gameId The ID of the game
   * @param playerId The ID of the player
   * @param amount The amount to buy in for
   * @returns The updated table session
   * @throws Error if buy-in validation fails or if player has insufficient balance
   */
  async processInitialBuyIn(gameId: string, playerId: string, amount: number): Promise<void> {
    const MAX_RETRIES = 3;
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
      try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // Check that game exists using GameManager
          const game = await this.gameManager.getGameById(gameId);
          if (!game) throw new GameNotFoundError(gameId);

          const user = await tx.user.findUnique({
            where: { id: playerId },
            select: { balance: true }
          });
          if (!user) throw new PlayerNotFoundError(playerId, gameId);

          // Validate buy-in amount
          if (amount < game.minBuyIn || amount > game.maxBuyIn) {
            throw new Error(`Buy-in amount must be between ${game.minBuyIn} and ${game.maxBuyIn}`);
          }

          // Check user balance
          if (user.balance < amount) {
            throw new InsufficientBalanceError(playerId, user.balance, amount);
          }

          // Check if player is already seated
          const existingSession = await tx.tableSession.findFirst({
            where: { gameId, playerId }
          });
          if (existingSession) {
            throw new PlayerAlreadySeatedError(playerId, gameId);
          }

          // Find first available seat with SERIALIZABLE isolation
          const takenSeats = await tx.tableSession.findMany({
            where: { gameId },
            select: { seatIndex: true },
            orderBy: { seatIndex: 'asc' }
          });
          const usedIndexes = new Set(takenSeats.map((s: { seatIndex: number }) => s.seatIndex));
          const seatIndex = [...Array(game.maxSeats).keys()].find(i => !usedIndexes.has(i));
          if (seatIndex === undefined) throw new NoSeatsAvailableError(gameId);

          // Deduct balance
          const updatedUser = await tx.user.update({
            where: { id: playerId },
            data: {
              balance: {
                decrement: amount
              }
            },
            select: { balance: true }
          });

          // Create transaction record
          await tx.transactionRecord.create({
            data: {
              userId: playerId,
              type: 'BUYIN',
              amount,
              gameId,
              balanceBefore: user.balance,
              balanceAfter: updatedUser.balance
            }
          });

          // Create table session
          await tx.tableSession.create({
            data: {
              gameId,
              playerId,
              stack: amount,
              seatIndex
            }
          });
        }, {
          isolationLevel: 'Serializable',
          maxWait: 5000,
          timeout: 10000
        });

        return; // success!
      } catch (err: any) {
        const isRetryable = err?.code === 'P2034' || err?.message?.includes('deadlock');
        attempts++;

        if (!isRetryable || attempts >= MAX_RETRIES) {
          throw err;
        }

        console.warn(`🟡 Retrying buy-in due to deadlock (attempt ${attempts})`);
        // Add jitter between retries
        await new Promise(res => setTimeout(res, 50 + Math.random() * 150));
      }
    }
  }

  /**
   * Gets the next available seat index at the table using a SERIALIZABLE transaction
   * to prevent race conditions when multiple players try to join simultaneously
   * @param gameId The ID of the game
   * @returns The next available seat index
   * @throws Error if no seats are available after maximum retries
   */
  private async getNextAvailableSeat(gameId: string): Promise<number> {
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < MAX_SEAT_RETRIES) {
      try {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // Get the game using GameManager
          const game = await this.gameManager.getGameById(gameId);
          if (!game) {
            throw new GameNotFoundError(gameId);
          }

          // Get all current sessions with their seat indices
          const sessions = await tx.tableSession.findMany({
            where: { gameId },
            select: { seatIndex: true },
            orderBy: { seatIndex: 'asc' }
          });

          // Find the first available seat
          let nextSeat = 0;
          for (const session of sessions) {
            if (session.seatIndex !== nextSeat) {
              break;
            }
            nextSeat++;
          }

          // Verify we haven't exceeded maxSeats
          if (nextSeat >= game.maxSeats) {
            throw new Error(`Table is full (max ${game.maxSeats} seats)`);
          }

          return nextSeat;
        }, {
          isolationLevel: 'Serializable',
          maxWait: 5000,
          timeout: 10000
        });
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));
        retries++;
        
        if (error && typeof error === 'object' && 'code' in error && 
            error.code === 'P2002') {
          continue;
        }
        
        throw error;
      }
    }

    throw new Error(`Failed to allocate seat after ${MAX_SEAT_RETRIES} retries: ${lastError?.message}`);
  }
} 