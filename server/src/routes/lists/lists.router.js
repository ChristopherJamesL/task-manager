const express = require("express");
const {} = require("./lists.controller");
const requireAuth = require("../../middleware/requireAuth");
const {} = require("./lists.validator");

const listsRouter = express.Router();

module.exports = listsRouter;
