const { registerUser, signInUser, me } = require("./auth.service");
const { sendSuccess } = require("../../utils/response");

async function httpRegister(req, res) {
  const user = await registerUser(req.body);

  return sendSuccess(res, { data: { user }, status: 201 });
}

async function httpSignIn(req, res) {
  const { identifier, password } = req.body;
  const ipAddr = req.ip;

  const { user, sessionId } = await signInUser({
    identifier,
    password,
    ipAddr,
  });

  res.cookie("sid", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendSuccess(res, { data: { user } });
}

async function httpMe(req, res) {
  const user = await me(req.user.userId);

  return sendSuccess(res, { data: { user } });
}

async function httpLogout(req, res) {
  return sendSuccess(res, {
    data: { message: "Logged out successfully" },
  });
}

module.exports = {
  httpRegister,
  httpSignIn,
  httpMe,
  httpLogout,
};
