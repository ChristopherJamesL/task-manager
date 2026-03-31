const { sendSuccess, sendError } = require("../../utils/response");
const {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} = require("./lists.model");

async function httpGetAllLists(req, res) {
  const userId = req.user.userId;

  try {
    const lists = await getAllLists(userId);
    return sendSuccess(res, {
      data: { lists },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to fetch lists" });
  }
}

async function httpGetListById(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  try {
    const list = await getListById(userId, listId);

    if (!list)
      return sendError(res, { message: "List not found", status: 404 });

    return sendSuccess(res, {
      data: { list },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to fetch list" });
  }
}

async function httpCreateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;

  try {
    const newList = await createList(userId, name);

    return sendSuccess(res, {
      data: { list: newList },
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to create list" });
  }
}

async function httpUpdateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;
  const listId = req.params.id;

  try {
    const updatedList = await updateList(userId, listId, name);

    if (!updatedList)
      return sendError(res, { message: "List not found", status: 404 });

    return sendSuccess(res, {
      data: { list: updatedList },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to update list" });
  }
}

async function httpDeleteList(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  try {
    const deletedList = await deleteList(userId, listId);

    if (!deletedList)
      return sendError(res, { message: "List not found", status: 404 });

    return sendSuccess(res, {
      data: { list: deletedList },
    });
  } catch (err) {
    console.error(err);
    return sendError(res, { message: "Failed to delete list" });
  }
}

module.exports = {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
};
