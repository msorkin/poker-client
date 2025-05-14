import { PrismaClient } from '@prisma/client';
import { PokerGame } from '../POkerGame';
import { PokerGameController } from '../PokerGameController';
import { Player } from '../Player';
import { prisma } from '../lib/prisma';
import { GameManager } from './game-manager.service';
import { GameNotFoundError } from '../errors/game-errors';
import { GameService } from './game.service';

///////////////////////////////////////////////////////////////

interface SessionWithPlayer {
  player: {
    id: string;
    username: string;
  };
  stack: number;
}

export class GameRecoveryService {
  private gameManager: GameManager;
  private gameService: GameService;

  constructor() {
    this.gameManager = GameManager.getInstance();
    this.gameService = new GameService();
  }

  async recoverActiveGames(): Promise<Map<string, { game: PokerGame; controller: PokerGameController }>> {
    const activeGames = new Map();

    try {
      // Find all non-closed games using GameManager
      const dbGames = await prisma.game.findMany({
        where: {
          status: {
            not: 'CLOSED'
          }
        },
        select: { id: true }
      });

      // Get full game details for each active game
      for (const { id } of dbGames) {
        const game = await this.gameManager.getGameById(id);
        if (!game) {
          console.warn(`Game ${id} not found during recovery`);
          continue;
        }

        // Recreate Player instances
        const players = game.sessions.map((session: SessionWithPlayer) => 
          new Player(
            session.player.id,
            session.player.username,
            session.stack
          )
        );

        // Recreate game instance
        const pokerGame = new PokerGame(players, id, this.gameService, game.smallBlind, game.bigBlind);
        const controller = new PokerGameController(id, players, this.gameService, game.maxHands);

        // If game was in progress, restore the last hand state
        if (game.status === 'IN_PROGRESS' && game.hands.length > 0) {
          const lastHand = game.hands[0];
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

        activeGames.set(game.id, { game: pokerGame, controller });
      }

      return activeGames;
    } catch (error) {
      console.error('Failed to recover active games:', error);
      throw error;
    }
  }

  async syncGameState(gameId: string, game: PokerGame): Promise<void> {
    try {
      // Verify game exists
      const dbGame = await this.gameManager.getGameById(gameId);
      if (!dbGame) {
        throw new GameNotFoundError(gameId);
      }

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