// const { createClient } = require("redis");
const Redis = require("ioredis");

let redisClient;

function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL);

    redisClient.on("connect", () => console.log("Redis connected..."));

    redisClient.on("error", () => console.error("Redis error: ", err));
  }
  return redisClient;
}

module.exports = {
  getRedisClient,
};
