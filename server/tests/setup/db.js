const { pool } = require("../../src/db/database");

async function resetDatabase() {
  await pool.query(`
    TRUNCATE TABLE
      authentication,
      users
    RESTART IDENTITY CASCADE;
  `);
}

async function closeDatabase() {
  await pool.end();
}

console.log("TEST DB POOL:", process.env.DATABASE_URL);

module.exports = {
  resetDatabase,
  closeDatabase,
  pool,
};
