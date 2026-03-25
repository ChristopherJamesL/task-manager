const pool = require("./database");

async function paginate({ dataQuery, dataParams = [] }) {
  const dataResult = await pool.query(dataQuery, dataParams);

  return {
    rows: dataResult.rows,
  };
}

module.exports = paginate;
