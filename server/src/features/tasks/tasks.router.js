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
  getTasksQuerySchema,
  taskIdParamSchema,
} = require("./tasks.validator");

const tasksRouter = express.Router();

tasksRouter.get(
  "/",
  requireAuth,
  validate(getTasksQuerySchema, "query"),
  httpGetAllTasks,
);
tasksRouter.get(
  "/:id",
  requireAuth,
  validate(taskIdParamSchema, "params"),
  httpGetTaskById,
);
tasksRouter.post("/", requireAuth, validate(createTaskSchema), httpCreateTask);
tasksRouter.patch(
  "/:id",
  requireAuth,
  validate(taskIdParamSchema, "params"),
  validate(updateTaskSchema),
  httpUpdateTask,
);
tasksRouter.delete(
  "/:id",
  requireAuth,
  validate(taskIdParamSchema, "params"),
  httpDeleteTask,
);

module.exports = tasksRouter;
