const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('../src/routes/comment');

const app = express();
app.use(express.json());
app.use(commentRoutes);

const commentPayload = {
  content: 'Test Comment',
  userId: '123456',
  username: 'test_user',
  channelId: '789012'
}


describe('commentRoutes', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('POST /api/comment', () => {
    it('should create a new comment', async () => {
      const response = await supertest(app)
        .post('/api/comment')
        .send(commentPayload);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        _id: expect.any(String),
        content: 'Test Comment',
        userId: '123456',
        username: 'test_user',
        channelId: '789012',
        status: 'new'
      });
    });
  });

  describe('GET /api/comments', () => {
    it('should get all comments', async () => {
      const response = await supertest(app).get('/api/comments');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

});
