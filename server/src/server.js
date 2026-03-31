const http = require("node:http");
const app = require("./app");
const pool = require("./db/database");
const { initRedis } = require("./db/redis");
const { initRateLimiters } = require("./middleware/rateLimiter");

const port = process.env.port || 8000;

async function startServer() {
  try {
    const redisClient = await initRedis();

    await pool.query("SELECT 1");
    console.log("Connected to PostgreSQL...");

    await initRateLimiters(redisClient);

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (err) {
    console.log("Failed to start server", err);
    process.exit(1);
  }
}

startServer();
