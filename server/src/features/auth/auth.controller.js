const { registerUser, signInUser, me } = require("./auth.service");
const { sendSuccess } = require("../../utils/response");

async function httpRegister(req, res) {
  const user = await registerUser(req.body);

  return sendSuccess(res, { data: { user }, status: 201 });
}

async function httpSignIn(req, res) {
  const { identifier, password } = req.body;
  const ipAddr = req.ip;

  const result = await signInUser({ identifier, password, ipAddr });

  return sendSuccess(res, { data: result });
}

async function httpMe(req, res) {
  const result = await me(req.user.userId);

  return sendSuccess(res, { data: result });
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
