const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthorizedError("Authorization header missing");

  const parts = authHeader.split(" ");
  if (parts.length > 2 || parts[0] !== "Bearer")
    throw new UnauthorizedError("Invalid authorization format");

  const token = parts[1];
  if (parts[0] && !token) throw new UnauthorizedError("Token missing");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
}

module.exports = requireAuth;
