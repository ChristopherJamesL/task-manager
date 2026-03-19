const express = require("express");
const { register, signIn, me } = require("./auth.controller");
const requireAuth = require("../../middleware/requireAuth");
const { registerSchema, signInSchema, validate } = require("./auth.validator");

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/signin", validate(signInSchema), signIn);

authRouter.get("/me", requireAuth, me);

module.exports = authRouter;
