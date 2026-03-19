const express = require("express");
const { register, signIn } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/signin", signIn);

module.exports = authRouter;
