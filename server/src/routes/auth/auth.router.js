const express = require("express");
const {
  httpRegister,
  httpSignIn,
  httpMe,
  httpLogout,
} = require("./auth.controller");
const requireAuth = require("../../middleware/requireAuth");
const { registerSchema, signInSchema, validate } = require("./auth.validator");

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), httpRegister);
authRouter.post("/signin", validate(signInSchema), httpSignIn);
authRouter.post("/logout", requireAuth, httpLogout);

authRouter.get("/me", requireAuth, httpMe);

module.exports = authRouter;
