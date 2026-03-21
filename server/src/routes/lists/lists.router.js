const express = require("express");
const {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateListName,
  httpDeleteList,
} = require("./lists.controller");
const requireAuth = require("../../middleware/requireAuth");
const {
  validate,
  createListSchema,
  updateListSchema,
} = require("./lists.validator");

const listsRouter = express.Router();

listsRouter.get("/", requireAuth, httpGetAllLists);
listsRouter.get("/:id", requireAuth, httpGetListById);
listsRouter.post("/", requireAuth, validate(createListSchema), httpCreateList);
listsRouter.patch(
  "/:id",
  requireAuth,
  validate(updateListSchema),
  httpUpdateListName,
);
listsRouter.delete("/:id", requireAuth, httpDeleteList);

module.exports = listsRouter;
