const { sendSuccess, sendError } = require("../../utils/response");
const {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} = require("./lists.service");

async function httpGetAllLists(req, res) {
  try {
    const result = await getAllLists(req.user.userId);
    return sendSuccess(res, {
      data: result,
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
    const result = await getListById({ userId, listId });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
    const result = await createList({ userId, name });

    return sendSuccess(res, {
      data: result,
      status: 201,
    });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return sendError(res, {
        message: "List name already exists",
        status: 400,
      });
    }
    return sendError(res, { message: "Failed to create list" });
  }
}

async function httpUpdateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;
  const listId = req.params.id;

  try {
    const result = await updateList({ userId, listId, name });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
    const result = await deleteList({ userId, listId });

    if (result.error)
      return sendError(res, { message: result.error, status: result.status });

    return sendSuccess(res, {
      data: result,
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
