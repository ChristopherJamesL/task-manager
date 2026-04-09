class AppError extends Error {
  constructor(message, statusCode = 500, field = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.field = field;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400, field);
  }
}

class UnauthorizedError extends AppError {
  constructor(message, field = null) {
    super(message, 401, field);
  }
}

class NotFoundError extends AppError {
  constructor(message, field = null) {
    super(message, 404, field);
  }
}

class ConflictError extends AppError {
  constructor(message, field = null) {
    super(message, 409, field);
  }
}

class RedisNotInitializedError extends AppError {
  constructor(
    message = "Redis not initialized.  Call initRedis() first.",
    field = null,
  ) {
    super(message, 500, field);
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests", field = null) {
    super(message, 429, field);
  }
}

module.exports = {
  AppError,
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  RedisNotInitializedError,
  TooManyRequestsError,
};
