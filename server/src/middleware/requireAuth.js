const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/response");

function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return sendError(res, {
        message: "Authorization header missing",
        status: 401,
      });

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return sendError(res, {
        message: "Invalid authorization format",
        status: 401,
      });
    }

    const token = parts[1];

    if (!token)
      return sendError(res, { message: "Token missing", status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    console.error("Auth error: ", err);
    return sendError(res, { message: "Invalid or expired token", status: 401 });
  }
}

module.exports = requireAuth;
