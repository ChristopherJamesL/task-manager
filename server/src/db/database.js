const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params, client) {
  if (client) return client.query(text, params);

  return pool.query(text, params);
}

async function withTransaction(callback) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await callback(client); // you added client here

    await client.query("COMMIT");

    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

console.log("APP DB POOL:", process.env.DATABASE_URL);

module.exports = {
  pool,
  query,
  withTransaction,
};
