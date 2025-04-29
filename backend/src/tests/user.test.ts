import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { app } from '../server'; // We'll need to export app from server.ts

const prisma = new PrismaClient();

describe('User CRUD Operations', () => {
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    passwordHash: 'dummypassword' // Remember: We're not hashing passwords for now
  };

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(testUser.username);
      expect(response.body.email).toBe(testUser.email);
    });

    it('should not create user with duplicate username', async () => {
      // First create a user
      await request(app).post('/users').send(testUser);

      // Try to create another user with same username
      const response = await request(app)
        .post('/users')
        .send({
          ...testUser,
          email: 'different@example.com'
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });

    it('should not create user with duplicate email', async () => {
      // First create a user
      await request(app).post('/users').send(testUser);

      // Try to create another user with same email
      const response = await request(app)
        .post('/users')
        .send({
          ...testUser,
          username: 'differentuser'
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      // Create a test user first
      await request(app).post('/users').send(testUser);

      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user', async () => {
      // Create a test user first
      const createResponse = await request(app).post('/users').send(testUser);
      const userId = createResponse.body.id;

      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(userId);
      expect(response.body.username).toBe(testUser.username);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      // Create a test user first
      const createResponse = await request(app).post('/users').send(testUser);
      const userId = createResponse.body.id;

      const updatedData = {
        username: 'updateduser',
        email: 'updated@example.com',
        passwordHash: 'newdummypassword'
      };

      const response = await request(app)
        .put(`/users/${userId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe(updatedData.username);
      expect(response.body.email).toBe(updatedData.email);
    });

    it('should return 404 for updating non-existent user', async () => {
      const response = await request(app)
        .put('/users/non-existent-id')
        .send(testUser);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      // Create a test user first
      const createResponse = await request(app).post('/users').send(testUser);
      const userId = createResponse.body.id;

      const response = await request(app).delete(`/users/${userId}`);
      expect(response.status).toBe(204);

      // Verify user is deleted
      const getResponse = await request(app).get(`/users/${userId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for deleting non-existent user', async () => {
      const response = await request(app).delete('/users/non-existent-id');
      expect(response.status).toBe(404);
    });
  });
}); 