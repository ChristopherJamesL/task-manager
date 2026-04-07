const { AppError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  if (!(err instanceof AppError)) {
    console.error("Unexpected Error: ", err);
    return res.status(500).json({
      success: false,
      error: {
        message: "Internal Server Error",
      },
    });
  }

  return res.status(err.statusCode).json({
    success: false,
    error: {
      message: err.message,
      field: err.field || null,
    },
  });
}

module.exports = errorHandler;
