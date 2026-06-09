const Redis = require("ioredis");
const { RedisNotInitializedError } = require("../utils/errors");
const { logger } = require("../utils/logger");

let redisClient;

async function initRedis() {
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL);

    redisClient.on("error", (err) => logger.error("Redis error: ", err));

    await new Promise((resolve, reject) => {
      function onReady() {
        cleanup();
        resolve();
      }

      function onError() {
        cleanup();
        reject();
      }

      function cleanup() {
        redisClient.off("ready", onReady);
        redisClient.off("error", onError);
      }

      redisClient.once("ready", onReady);
      redisClient.once("error", onError);
    });

    logger.info("Redis connected...");
  }

  return redisClient;
}

function getRedisClient() {
  if (!redisClient) {
    throw new RedisNotInitializedError();
  }
  return redisClient;
}

async function closeRedisClient(client) {
  if (client) await client.quit();
}

module.exports = {
  initRedis,
  getRedisClient,
  closeRedisClient,
};
