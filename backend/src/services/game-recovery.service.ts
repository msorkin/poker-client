import { PrismaClient } from '@prisma/client';
import { PokerGame } from '../POkerGame';
import { PokerGameController } from '../PokerGameController';
import { Player } from '../Player';

const prisma = new PrismaClient();

interface SessionWithPlayer {
  player: {
    id: string;
    username: string;
  };
  stack: number;
}

export class GameRecoveryService {
  async recoverActiveGames(): Promise<Map<string, { game: PokerGame; controller: PokerGameController }>> {
    const activeGames = new Map();

    try {
      // Find all games that are not completed
      const dbGames = await prisma.game.findMany({
        where: {
          status: {
            not: 'COMPLETED'
          }
        },
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

      for (const dbGame of dbGames) {
        // Recreate Player instances
        const players = dbGame.sessions.map((session: SessionWithPlayer) => 
          new Player(
            session.player.id,
            session.player.username,
            session.stack
          )
        );

        // Recreate game instance
        const game = new PokerGame(players, dbGame.smallBlind, dbGame.bigBlind);
        const controller = new PokerGameController(game, 7);

        // If game was in progress, restore the last hand state
        if (dbGame.status === 'IN_PROGRESS' && dbGame.hands.length > 0) {
          const lastHand = dbGame.hands[0];
          const playerStates = JSON.parse(lastHand.playerStates);
          
          // Restore player states
          for (const playerState of playerStates) {
            const player = players.find((p: Player) => p.id === playerState.id);
            if (player) {
              player.stack = playerState.stack;
              // Add other state restoration as needed
            }
          }
        }

        activeGames.set(dbGame.id, { game, controller });
      }

      return activeGames;
    } catch (error) {
      console.error('Failed to recover active games:', error);
      throw error;
    }
  }

  async syncGameState(gameId: string, game: PokerGame): Promise<void> {
    try {
      const gameState = game.getGameState();
      
      // Update player stacks in database
      const updatePromises = gameState.players.map(player => 
        prisma.tableSession.updateMany({
          where: {
            gameId,
            playerId: player.id
          },
          data: {
            stack: player.stack
          }
        })
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Failed to sync game state:', error);
      throw error;
    }
  }
} 