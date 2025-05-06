// check-prisma.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

console.log('Prisma keys:', Object.keys(prisma));