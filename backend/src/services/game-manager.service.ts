import { prisma } from '../lib/prisma';

///////////////////////////////////////

export class GameManager {
  private static instance: GameManager;

  private constructor() {
    // Private constructor to prevent direct construction calls with `new`
  }

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  async getGameById(gameId: string) {
    return prisma.game.findUnique({
      where: { id: gameId },
      include: {
        sessions: {
          include: {
            player: {
              select: {
                id: true,
                username: true,
                balance: true
              }
            }
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
  }

  async listWaitingGames() {
    return prisma.game.findMany({
      where: { status: 'WAITING' },
      select: {
        id: true,
        createdAt: true,
        smallBlind: true,
        bigBlind: true,
        minBuyIn: true,
        maxBuyIn: true,
        maxSeats: true,
        currentHand: true,
        status: true,
      }
    });
  }
} 