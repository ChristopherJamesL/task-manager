const { registerUser, signInUser, me } = require("./auth.service");
const { sendSuccess, sendError } = require("../../utils/response");

async function httpRegister(req, res) {
  try {
    const user = await registerUser(req.body);

    return sendSuccess(res, { data: { user }, status: 201 });
  } catch (err) {
    console.error("Registration error: ", err);
    if (err.code === "23505") {
      return sendError(res, {
        message: "Username or email already exists",
        status: 400,
      });
    }
    return sendError(res, { message: "Registration failed" });
  }
}

async function httpSignIn(req, res) {
  const { identifier, password } = req.body;
  const ipAddr = req.ip;

  try {
    const result = await signInUser({ identifier, password, ipAddr });

    if (result.error) {
      return sendError(res, { message: result.error, status: result.status });
    }

    return sendSuccess(res, { data: result });
  } catch (err) {
    console.error("Login error: ", err);
    return sendError(res, { message: "Login failed" });
  }
}

async function httpMe(req, res) {
  try {
    const result = await me(req.user.userId);

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, { data: result });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to fetch user" });
  }
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
