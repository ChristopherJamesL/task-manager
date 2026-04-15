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
const normalizeAuthInput = require("../../middleware/normalizeAuthInput");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  normalizeAuthInput,
  httpRegister,
);
authRouter.post(
  "/signin",
  validate(signInSchema),
  normalizeAuthInput,
  preLoginRateLimiter,
  httpSignIn,
);
authRouter.post("/logout", requireAuth, httpLogout);

authRouter.get("/me", requireAuth, httpMe);

module.exports = authRouter;
