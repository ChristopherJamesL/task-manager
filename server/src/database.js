const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL...");
    client.release();
  })
  .catch((err) => {
    console.error("PostgreSQL conenction error", err);
  });

module.exports = pool;
