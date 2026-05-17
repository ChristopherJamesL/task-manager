const { UnauthorizedError } = require("../utils/errors");
const { getRedisClient } = require("../db/redis");

async function requireAuth(req, res, next) {
  const sessionId = req.cookies.sid;

  if (!sessionId) throw new UnauthorizedError("Not authenticated");

  const redis = getRedisClient();

  const sessionData = await redis.get(`session:${sessionId}`);

  if (!sessionData) throw new UnauthorizedError("Session expired or invalid");

  let session;

  try {
    session = JSON.parse(sessionData);
  } catch {
    throw new UnauthorizedError("Corrupted session");
  }

  req.user = {
    userId: session.userId,
  };

  req.sessionId = sessionId;

  next();
}

module.exports = requireAuth;
