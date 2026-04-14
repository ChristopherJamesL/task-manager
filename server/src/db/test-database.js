const { pool } = require("./database");

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Postgres returned: ", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Error querying PostgreSQL: ", err);
    process.exit(1);
  }
}

testConnection();
