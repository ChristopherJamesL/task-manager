const express = require("express");
const {
  httpGetAllTasks,
  httpGetTaskById,
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
} = require("./tasks.controller");
const requireAuth = require("../../middleware/requireAuth");
const {
  validate,
  createTaskSchema,
  updateTaskSchema,
} = require("./tasks.validator");

const tasksRouter = express.Router();

tasksRouter.get("/", requireAuth, httpGetAllTasks);
tasksRouter.get("/:id", requireAuth, httpGetTaskById);
tasksRouter.post("/", requireAuth, validate(createTaskSchema), httpCreateTask);
tasksRouter.patch(
  "/:id",
  requireAuth,
  validate(updateTaskSchema),
  httpUpdateTask,
);
tasksRouter.delete("/:id", requireAuth, httpDeleteTask);

module.exports = tasksRouter;
