import { PrismaClient } from '@prisma/client';
import { Player } from '../Player';
import { Card } from '../Card';

const prisma = new PrismaClient();

interface PlayerState {
  id: string;
  name: string;
  stack: number;
  currentBet: number;
  totalContributed: number;
  folded: boolean;
  allIn: boolean;
  holeCards?: { suit: string; rank: string }[];
}

interface SidePot {
  amount: number;
  contenders: string[];
}

export class GameService {
  async createGame(players: Player[], smallBlind: number = 5, bigBlind: number = 10, maxHands: number = 10, maxSeats: number = 6) {
    try {
      // Validate maxSeats is between 2 and 9
      if (maxSeats < 2 || maxSeats > 9) {
        throw new Error('maxSeats must be between 2 and 9 inclusive');
      }

      // Validate number of players doesn't exceed maxSeats
      if (players.length > maxSeats) {
        throw new Error(`Number of players (${players.length}) exceeds maximum seats (${maxSeats})`);
      }

      // Create the game record with initial configuration
      const game = await prisma.game.create({
        data: {
          status: 'WAITING',
          smallBlind,
          bigBlind,
          maxHands,
          maxSeats,
          currentHand: 0,
          dealerIndex: 0,
          // Create table sessions for each player
          sessions: {
            create: players.map((player, index) => ({
              player: {
                connect: { id: player.id }
              },
              stack: player.stack,
              seatIndex: index
            }))
          }
        },
        include: {
          sessions: {
            include: {
              player: true
            }
          }
        }
      });

      return game;
    } catch (error) {
      console.error('Failed to create game:', error);
      throw error;
    }
  }

  async updateGameStatus(gameId: string, status: 'WAITING' | 'ACTIVE' | 'IN_PROGRESS' | 'CLOSED') {
    try {
      return await prisma.game.update({
        where: { id: gameId },
        data: { status }
      });
    } catch (error) {
      console.error('Failed to update game status:', error);
      throw error;
    }
  }

  async updateGameRound(gameId: string, round: 'PREFLOP' | 'FLOP' | 'TURN' | 'RIVER' | 'SHOWDOWN' | null) {
    try {
      return await prisma.game.update({
        where: { id: gameId },
        data: { currentRound: round }
      });
    } catch (error) {
      console.error('Failed to update game round:', error);
      throw error;
    }
  }

  async createHand(
    gameId: string,
    handNumber: number,
    {
      communityCards,
      pot,
      sidePots,
      currentBet,
      dealerIndex,
      playerStates,
      isShowdown = false
    }: {
      communityCards: Card[];
      pot: number;
      sidePots: SidePot[];
      currentBet: number;
      dealerIndex: number;
      playerStates: PlayerState[];
      isShowdown?: boolean;
    }
  ) {
    try {
      return await prisma.hand.create({
        data: {
          gameId,
          handNumber,
          communityCards: JSON.stringify(communityCards),
          pot,
          sidePots: JSON.stringify(sidePots),
          currentBet,
          dealerIndex,
          isShowdown,
          playerStates: JSON.stringify(playerStates),
          completedAt: isShowdown ? new Date() : null
        }
      });
    } catch (error) {
      console.error('Failed to create hand:', error);
      throw error;
    }
  }

  async completeHand(handId: string, finalState: {
    communityCards: Card[];
    pot: number;
    sidePots: SidePot[];
    playerStates: PlayerState[];
  }) {
    try {
      return await prisma.hand.update({
        where: { id: handId },
        data: {
          communityCards: JSON.stringify(finalState.communityCards),
          pot: finalState.pot,
          sidePots: JSON.stringify(finalState.sidePots),
          playerStates: JSON.stringify(finalState.playerStates),
          isShowdown: true,
          completedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to complete hand:', error);
      throw error;
    }
  }

  async updatePlayerStack(sessionId: string, stack: number) {
    try {
      return await prisma.tableSession.update({
        where: { id: sessionId },
        data: { stack }
      });
    } catch (error) {
      console.error('Failed to update player stack:', error);
      throw error;
    }
  }

  async getGame(gameId: string) {
    try {
      return await prisma.game.findUnique({
        where: { id: gameId },
        include: {
          sessions: {
            include: {
              player: true
            }
          },
          hands: {
            orderBy: {
              handNumber: 'desc'
            },
            take: 1
          }
        }
      });
    } catch (error) {
      console.error('Failed to get game:', error);
      throw error;
    }
  }

  async getHandHistory(gameId: string) {
    try {
      return await prisma.hand.findMany({
        where: { gameId },
        orderBy: { handNumber: 'asc' }
      });
    } catch (error) {
      console.error('Failed to get hand history:', error);
      throw error;
    }
  }

  async getActivePlayerCount(gameId: string): Promise<number> {
    try {
      const count = await prisma.tableSession.count({
        where: {
          gameId,
          // Add any additional conditions that define an "active" player
          stack: {
            gt: 0
          }
        }
      });
      return count;
    } catch (error) {
      console.error('Failed to get active player count:', error);
      throw error;
    }
  }

  async closeTableIfEmpty(gameId: string): Promise<boolean> {
    try {
      const activePlayerCount = await this.getActivePlayerCount(gameId);
      
      if (activePlayerCount > 0) {
        console.log(`Table ${gameId} still has ${activePlayerCount} active players - not closing`);
        return false;
      }

      // Close the table only if no active players
      await prisma.game.update({
        where: { id: gameId },
        data: { 
          status: 'CLOSED',
          closedAt: new Date()
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to close table:', error);
      throw error;
    }
  }

  async removePlayerFromTable(gameId: string, playerId: string): Promise<void> {
    try {
      // First get the seat index of the player being removed
      const session = await prisma.tableSession.findFirst({
        where: {
          gameId,
          playerId
        },
        select: {
          seatIndex: true
        }
      });

      if (!session) {
        throw new Error(`Player ${playerId} not found at table ${gameId}`);
      }

      // Delete the player's session
      await prisma.tableSession.deleteMany({
        where: {
          gameId,
          playerId
        }
      });

      // The seat is now automatically available due to the deletion
      // The unique constraint on [gameId, seatIndex] ensures no conflicts
      // when new players join

      // Check if table should be closed
      await this.closeTableIfEmpty(gameId);
    } catch (error) {
      console.error('Failed to remove player from table:', error);
      throw error;
    }
  }

  // Admin-only method to force close a table
  async forceCloseTable(gameId: string): Promise<void> {
    try {
      // Delete all active sessions
      await prisma.tableSession.deleteMany({
        where: { gameId }
      });

      // Update table status
      await prisma.game.update({
        where: { id: gameId },
        data: { 
          status: 'CLOSED',
          closedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to force close table:', error);
      throw error;
    }
  }
}