import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('Users:');
  console.dir(users, { depth: null });

  // Fetch all games
  const games = await prisma.game.findMany();
  console.log('Games:');
  console.dir(games, { depth: null });

  // Fetch all table sessions
  const sessions = await prisma.tableSession.findMany();
  console.log('TableSessions:');
  console.dir(sessions, { depth: null });

  console.log('✅ DB connection and queries successful!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 