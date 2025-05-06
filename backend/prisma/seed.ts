import { PrismaClient } from '@prisma/client';
import { AuthService } from '../src/services/auth.service';
import { BuyInManager } from '../src/services/buy-in.service';

const prisma = new PrismaClient();
const authService = new AuthService();
const buyInManager = new BuyInManager();
//const GameStatus = prisma.gameStatus; // Or use string enums as fallback

const GameStatus = {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
} as const;

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  console.log('🧹 Cleaning up existing data...');
  await prisma.$transaction([
    prisma.tableSession.deleteMany(),
    prisma.hand.deleteMany(),
    prisma.game.deleteMany(),
    prisma.user.deleteMany()
  ]);

  // Create test users
  console.log('👥 Creating test users...');
  const userData = [
    { username: 'alice', email: 'alice@test.com', password: 'password123' },
    { username: 'bob', email: 'bob@test.com', password: 'password123' },
    { username: 'charlie', email: 'charlie@test.com', password: 'password123' },
    { username: 'dave', email: 'dave@test.com', password: 'password123' },
  ];
  
  // Create users directly with Prisma so they are visible in transactions
  const users = await Promise.all(userData.map(data =>
    prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: data.password, // If you want to hash, call hash function here
        balance: 10000,
      }
    })
  ));

  // Update user balances
  console.log('💰 Setting initial balances...');
  await Promise.all(
    users.map(user =>
      prisma.user.update({
        where: { id: user.id },
        data: {
          balance: { set: 10000 } // Correct format to update scalar fields
        }
      })
    )
  );

  // Create a test game
  console.log('🎮 Creating test game...');
  const game = await prisma.game.create({
    data: {
      status: GameStatus.WAITING,
      smallBlind: 5,
      bigBlind: 10,
      minBuyIn: 100,
      maxBuyIn: 1000,
      maxHands: 100,
      maxSeats: 6,
      currentHand: 0,
      dealerIndex: 0,
      currentRound: null
    }
  });

  // Set up initial table sessions with buy-ins
  console.log('🪑 Setting up table sessions...');
  const buyInAmount = 1000;
  await Promise.all(
    users.map(user =>
      buyInManager.processInitialBuyIn(game.id, user.id, buyInAmount)
    )
  );

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
