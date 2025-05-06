import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Define transaction types as const for type safety
const TransactionType = {
  BUYIN: 'BUYIN' as const,
  CASHOUT: 'CASHOUT' as const,
  REBUY: 'REBUY' as const
} as const;

// Maximum number of retries for seat allocation
const MAX_SEAT_RETRIES = 3;

export class BuyInManager {
  /**
   * Validates if a buy-in amount is within the game's limits
   * @param gameId The ID of the game
   * @param amount The amount to buy in for
   * @returns boolean indicating if the buy-in is valid
   * @throws Error if game is not found
   */
  async validateBuyIn(gameId: string, amount: number): Promise<boolean> {
    try {
      const game = await prisma.game.findUnique({
        where: { id: gameId },
        select: {
          minBuyIn: true,
          maxBuyIn: true
        }
      });

      if (!game) {
        throw new Error(`Game with ID ${gameId} not found`);
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
  async processInitialBuyIn(gameId: string, playerId: string, amount: number) {
    try {
      // Validate amount is a safe positive integer
      if (!Number.isInteger(amount)) {
        throw new Error(`Invalid buy-in amount: must be an integer, got ${amount}`);
      }
      if (amount <= 0) {
        throw new Error(`Invalid buy-in amount: must be positive, got ${amount}`);
      }
      if (amount > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Invalid buy-in amount: must be less than ${Number.MAX_SAFE_INTEGER}, got ${amount}`);
      }

      // Validate the buy-in amount
      const isValid = await this.validateBuyIn(gameId, amount);
      if (!isValid) {
        throw new Error('Invalid buy-in amount');
      }

      // Use a transaction to ensure atomicity of all operations
      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Get the player's current balance within the transaction
        const user = await tx.user.findUnique({
          where: { id: playerId },
          select: { balance: true }
        });

        if (!user) {
          throw new Error(`User with ID ${playerId} not found`);
        }

        if (user.balance < amount) {
          throw new Error('Insufficient balance for buy-in');
        }

        // Update user balance with additional check to prevent negative balance
        const updatedUser = await tx.user.update({
          where: { 
            id: playerId,
            balance: {
              gte: amount // Only update if current balance is >= amount
            }
          },
          data: { balance: { decrement: amount } },
          select: { balance: true }
        });

        if (!updatedUser) {
          throw new Error('Insufficient balance for buy-in (race condition detected)');
        }

        // Create transaction record
        await tx.transactionRecord.create({
          data: {
            userId: playerId,
            type: TransactionType.BUYIN,
            amount,
            gameId,
            balanceBefore: user.balance,
            balanceAfter: updatedUser.balance
          }
        });

        // Create or update the table session
        const session = await tx.tableSession.upsert({
          where: {
            gameId_playerId: {
              gameId,
              playerId
            }
          },
          update: {
            stack: amount
          },
          create: {
            gameId,
            playerId,
            stack: amount,
            seatIndex: await this.getNextAvailableSeat(gameId)
          }
        });

        return session;
      });

      return result;
    } catch (error) {
      console.error('Failed to process initial buy-in:', error);
      throw error;
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
          // Get the game's maxSeats
          const game = await tx.game.findUnique({
            where: { id: gameId },
            select: { maxSeats: true }
          });

          if (!game) {
            throw new Error(`Game ${gameId} not found`);
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

          // Verify the seat is still available by attempting to create a temporary session
          // This will fail if another transaction claimed the seat
          await tx.tableSession.create({
            data: {
              gameId,
              playerId: 'temp', // Temporary ID to reserve the seat
              seatIndex: nextSeat,
              stack: 0
            }
          });

          // If we got here, the seat is ours
          return nextSeat;
        }, {
          isolationLevel: 'Serializable',
          maxWait: 5000, // 5 seconds
          timeout: 10000 // 10 seconds
        });
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));
        retries++;
        
        // If it's a unique constraint violation, another transaction got the seat
        // We should retry
        if (error && typeof error === 'object' && 'code' in error && 
            error.code === 'P2002') {
          continue;
        }
        
        // For other errors, throw immediately
        throw error;
      }
    }

    throw new Error(`Failed to allocate seat after ${MAX_SEAT_RETRIES} retries: ${lastError?.message}`);
  }
} 