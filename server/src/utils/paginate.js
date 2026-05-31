const { pool } = require("../db/database");

async function paginate({ dataQuery, dataParams = [] }) {
  console.log(">>> EXECUTING SQL:");
  console.log(dataQuery);
  console.log(">>> WITH PARAMS:");
  console.log(JSON.stringify(dataParams, null, 2));

  const dataResult = await pool.query(dataQuery, dataParams);

  return {
    rows: dataResult.rows,
  };
}

module.exports = paginate;
