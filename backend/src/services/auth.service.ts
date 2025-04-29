import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
  async register(username: string, email: string, password: string) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        throw new Error('Username or email already exists');
      }

      // For now, we'll store the password as-is since we're using dummy users
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash: password // Temporarily storing plain password for dummy implementation
        }
      });

      return { user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      throw error;
    }
  }

  async login(usernameOrEmail: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // For dummy implementation, we'll just compare the plain passwords
      if (password !== user.passwordHash) {
        throw new Error('Invalid password');
      }

      return { user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      throw error;
    }
  }
} 