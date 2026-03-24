function sendSuccess(res, { data = null, meta = null, status = 200 }) {
  return res.status(status).json({
    success: true,
    data,
    meta,
  });
}

function sendError(res, { message, field = null, status = 500 }) {
  return res.status(status).json({
    success: false,
    error: {
      message,
      field,
    },
  });
}

module.exports = {
  sendSuccess,
  sendError,
};
