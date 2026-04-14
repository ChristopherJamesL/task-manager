process.env.NODE_ENV = "test";

require("dotenv").config({
  path: ".env.test",
});

const { resetDatabase, closeDatabase } = require("./db");
const {
  getRedisClient,
  initRedis,
  closeRedisClient,
} = require("../../src/db/redis");
const { initRateLimiters } = require("../../src/middleware/rateLimiter");

let redisClient;

beforeAll(async () => {
  await resetDatabase();
  redisClient = await initRedis();
  await initRateLimiters(redisClient);
});

beforeEach(async () => {
  await redisClient.flushdb();
});

afterAll(async () => {
  await closeDatabase();
  if (redisClient) await closeRedisClient(getRedisClient());
});
