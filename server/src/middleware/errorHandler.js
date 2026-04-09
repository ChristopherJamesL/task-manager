const { logger } = require("../utils/logger");
const { AppError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  const minimalReq = {
    method: req.method,
    url: req.url,
  };

  if (!(err instanceof AppError)) {
    logger.error({ err, req: minimalReq }, "Unexpected error");
    return res.status(500).json({
      success: false,
      error: {
        message: "Internal Server Error",
      },
    });
  }

  logger.error({ err, req: minimalReq }, "Operational error");

  return res.status(err.statusCode).json({
    success: false,
    error: {
      message: err.message,
      field: err.field || null,
    },
  });
}

module.exports = errorHandler;
