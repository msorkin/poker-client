import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      username: 'alice',
      email: 'alice@example.com',
      passwordHash: 'testhash1',
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      username: 'bob',
      email: 'bob@example.com',
      passwordHash: 'testhash2',
    },
  });
  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@example.com' },
    update: {},
    create: {
      username: 'charlie',
      email: 'charlie@example.com',
      passwordHash: 'testhash3',
    },
  });

  // Create games
  const game1 = await prisma.game.create({
    data: {
      status: 'waiting',
    },
  });
  const game2 = await prisma.game.create({
    data: {
      status: 'active',
    },
  });

  // Assign users to games (TableSession)
  await prisma.tableSession.createMany({
    data: [
      { gameId: game1.id, playerId: alice.id },
      { gameId: game1.id, playerId: bob.id },
      { gameId: game2.id, playerId: charlie.id },
      { gameId: game2.id, playerId: alice.id },
    ],
  });

  console.log('✅ Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 