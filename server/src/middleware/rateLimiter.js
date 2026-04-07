const { RateLimiterRedis } = require("rate-limiter-flexible");
const { findUserWithPassword } = require("../features/auth/auth.model");
const { TooManyRequestsError } = require("../utils/errors");

let limiterByUser;
let limiterByIP;

const MAX_WRONG_ATTEMPTS_BY_USER_PER_MINUTE = 5;
const MAX_WRONG_ATTEMPTS_BY_IP_PER_HOUR = 100;

function rateLimitMessage(msBeforeNext) {
  const seconds = Math.ceil(msBeforeNext / 1000);
  return `Too many login attempts. Try again in ${seconds} seconds.`;
}

async function initRateLimiters(redisClient) {
  limiterByUser = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_user",
    points: MAX_WRONG_ATTEMPTS_BY_USER_PER_MINUTE,
    duration: 60,
    blockDuration: 60 * 5,
  });

  limiterByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_ip",
    points: MAX_WRONG_ATTEMPTS_BY_IP_PER_HOUR,
    duration: 60 * 60,
    blockDuration: 60 * 15,
  });
}

async function preLoginRateLimiter(req, res, next) {
  const ipAddr = req.ip;
  const identifier = req.body.identifier;

  try {
    const user = await findUserWithPassword(identifier);
    const userKey = user ? `user:${user.id}` : `user:${identifier}`;

    await Promise.all([
      limiterByUser.get(userKey).then((r) => {
        if (r && r.consumedPoints >= MAX_WRONG_ATTEMPTS_BY_USER_PER_MINUTE) {
          throw new TooManyRequestsError(rateLimitMessage(r.msBeforeNext));
        }
      }),

      limiterByIP.get(ipAddr).then((r) => {
        if (r && r.consumedPoints >= MAX_WRONG_ATTEMPTS_BY_IP_PER_HOUR) {
          throw new TooManyRequestsError(rateLimitMessage(r.msBeforeNext));
        }
      }),
    ]);

    next();
  } catch (err) {
    next(err);
  }
}

async function consumeLoginFail(identifier, ipAddr) {
  try {
    const user = await findUserWithPassword(identifier);
    const userKey = user ? `user:${user.id}` : `identifier:${identifier}`;

    await Promise.all([
      limiterByUser.consume(userKey),
      limiterByIP.consume(ipAddr),
    ]);
  } catch (err) {
    console.warn("Rate limiter consume failed", err);
  }
}

module.exports = {
  initRateLimiters,
  preLoginRateLimiter,
  consumeLoginFail,
};
