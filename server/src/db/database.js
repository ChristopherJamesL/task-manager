const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let testClient = null;

function setTestClient(client) {
  testClient = client;
}

function clearTestClient() {
  testClient = null;
}

async function query(text, params) {
  if (testClient) {
    return testClient.query(text, params);
  }
  return pool.query(text, params);
}

async function withTransaction(callback) {
  if (testClient) return callback();

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    setTestClient(client);

    const result = await callback();

    await client.query("COMMIT");

    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    clearTestClient();
    client.release();
  }
}

console.log("APP DB POOL:", process.env.DATABASE_URL);

module.exports = {
  pool,
  query,
  setTestClient,
  clearTestClient,
  withTransaction,
};
