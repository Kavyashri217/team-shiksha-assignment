import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

describe('Auth Endpoints', () => {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    name: 'Test User',
  };

  test('POST /api/auth/signup - should create new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);
    expect(res.body.user).toHaveProperty('name', testUser.name);
  });

  test('POST /api/auth/signup - should fail with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ ...testUser, email: 'invalid-email' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('POST /api/auth/signup - should fail with short password', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ ...testUser, password: '123' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('POST /api/auth/signin - should authenticate user', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  test('POST /api/auth/signin - should fail with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});