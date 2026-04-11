process.env.NODE_ENV = "test";

require("dotenv").config({
  path: ".env.test",
});

const { resetDatabase, closeDatabase } = require("./db");
const { initRedis, closeRedisClient } = require("../../src/db/redis");
const { initRateLimiters } = require("../../src/middleware/rateLimiter");

let redisClient;

beforeAll(async () => {
  redisClient = await initRedis();
  await initRateLimiters(redisClient);
});

beforeEach(async () => {
  await resetDatabase();
  await redisClient.flushdb();
});

afterAll(async () => {
  if (redisClient) await closeRedisClient(redisClient);

  await closeDatabase();
});
