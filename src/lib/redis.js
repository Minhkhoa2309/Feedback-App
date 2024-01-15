const { Redis } = require('ioredis');
require('dotenv').config();
const { REDIS_URL } = require('../../config.json')

const redis = new Redis(REDIS_URL, { username: 'feedback_admin', password: process.env.REDIS_PASSWORD });

module.exports = redis;