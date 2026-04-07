function sendSuccess(res, { data = null, meta = null, status = 200 }) {
  return res.status(status).json({
    success: true,
    data,
    meta,
  });
}

module.exports = {
  sendSuccess,
};
