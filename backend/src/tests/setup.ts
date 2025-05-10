import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  // Clean up the test database before each test
  // Delete related records first
// DELETE CHILDREN FIRST
await prisma.transactionRecord.deleteMany({});
await prisma.tableSession.deleteMany({});
await prisma.hand.deleteMany({});
await prisma.game.deleteMany({});
await prisma.user.deleteMany({});
});

afterAll(async () => {
  // Disconnect Prisma after all tests
  await prisma.$disconnect();
}); 