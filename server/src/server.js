const http = require("node:http");
const app = require("./app");
const pool = require("./db/database");
const { initRedis } = require("./db/redis");
const { initRateLimiters } = require("./middleware/rateLimiter");
const { logger } = require("./utils/logger");

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    const redisClient = await initRedis();

    await pool.query("SELECT 1");
    logger.info("Connected to PostgreSQL...");

    await initRateLimiters(redisClient);

    const server = http.createServer(app);

    server.listen(port, () => {
      logger.info(`Server listening on port ${port}...`);
    });
  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }
}

startServer();
