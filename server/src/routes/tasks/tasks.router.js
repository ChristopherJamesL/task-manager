const express = require("express");
const {} = require("./tasks.controller");
const requireAuth = require("../../middleware/requireAuth");
const {} = require("./tasks.validator");

const tasksRouter = express.Router();

module.exports = tasksRouter;
