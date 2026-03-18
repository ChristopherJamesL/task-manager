const http = require("node:http");
const app = require("./app");

const port = process.env.port || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
