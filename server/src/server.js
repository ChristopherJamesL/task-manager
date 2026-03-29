const http = require("node:http");
const app = require("./app");
const { getRedisClient } = require("./db/redis");

const port = process.env.port || 8000;

async function startServer() {
  try {
    getRedisClient();

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
