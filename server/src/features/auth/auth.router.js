const express = require("express");
const {
  httpRegister,
  httpSignIn,
  httpMe,
  httpLogout,
} = require("./auth.controller");
const { registerSchema, signInSchema, validate } = require("./auth.validator");
const { preLoginRateLimiter } = require("../../middleware/rateLimiter");
const requireAuth = require("../../middleware/requireAuth");

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), httpRegister);
authRouter.post(
  "/signin",
  validate(signInSchema),
  preLoginRateLimiter,
  httpSignIn,
);
authRouter.post("/logout", requireAuth, httpLogout);

authRouter.get("/me", requireAuth, httpMe);

module.exports = authRouter;
