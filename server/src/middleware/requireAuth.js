const { UnauthorizedError } = require("../utils/errors");
const { getRedisClient } = require("../db/redis");

async function requireAuth(req, res, next) {
  try {
    const sessionId = req.cookies.sid;

    if (!sessionId) throw new UnauthorizedError("Not authenticated");

    const redis = getRedisClient();

    const sessionData = await redis.get(`session:${sessionId}`);

    if (!sessionData) throw new UnauthorizedError("Session expired or invalid");

    const session = JSON.parse(sessionData);

    req.user = {
      userId: session.userId,
    };

    next();
  } catch (err) {
    throw new UnauthorizedError("Not authenticated");
  }
}

module.exports = requireAuth;
