const express = require("express");
const {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
} = require("./lists.controller");
const requireAuth = require("../../middleware/requireAuth");
const {
  validate,
  createListSchema,
  updateListSchema,
  listIdParamSchema,
} = require("./lists.validator");

const listsRouter = express.Router();

listsRouter.get("/", requireAuth, httpGetAllLists);
listsRouter.get(
  "/:id",
  requireAuth,
  validate(listIdParamSchema, "params"),
  httpGetListById,
);
listsRouter.post("/", requireAuth, validate(createListSchema), httpCreateList);
listsRouter.patch(
  "/:id",
  requireAuth,
  validate(listIdParamSchema, "params"),
  validate(updateListSchema),
  httpUpdateList,
);
listsRouter.delete(
  "/:id",
  requireAuth,
  validate(listIdParamSchema, "params"),
  httpDeleteList,
);

module.exports = listsRouter;
