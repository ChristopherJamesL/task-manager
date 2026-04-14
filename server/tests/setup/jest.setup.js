process.env.NODE_ENV = "test";

require("dotenv").config({
  path: ".env.test",
});

const { resetDatabase, closeDatabase } = require("./db");
const {
  startTestTransaction,
  rollbackTestTransaction,
} = require("./dbSession");
const { setTestClient, clearTestClient } = require("../../src/db/database");
const {
  getRedisClient,
  initRedis,
  closeRedisClient,
} = require("../../src/db/redis");

beforeAll(async () => {
  await resetDatabase();
  await initRedis();
});

beforeEach(async () => {
  const client = await startTestTransaction();
  setTestClient(client);

  const redisClient = await getRedisClient();
  await redisClient.flushdb();
});

afterEach(async () => {
  await rollbackTestTransaction();

  clearTestClient();
});

afterAll(async () => {
  await closeDatabase();
  await closeRedisClient(getRedisClient());
});
