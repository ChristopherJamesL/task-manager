const pool = require("./database");

async function paginate({
  dataQuery,
  dataParams = [],
  countQuery,
  countParams = [],
}) {
  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, dataParams),
    pool.query(countQuery, countParams),
  ]);

  return {
    rows: dataResult.rows,
    total: parseInt(countResult.rows[0].count, 10),
  };
}

module.exports = paginate;
