const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let client;

async function startTestTransaction() {
  client = await pool.connect();
  await client.query("BEGIN");
  return client;
}

async function rollbackTestTransaction() {
  if (!client) return;

  try {
    await client.query("ROLLBACK");
  } finally {
    client.release();
    client = null;
  }
}

function getTestClient() {
  return client;
}

module.exports = {
  startTestTransaction,
  rollbackTestTransaction,
  getTestClient,
};
