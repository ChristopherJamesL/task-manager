const { sendSuccess } = require("../../utils/response");
const {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} = require("./lists.service");

async function httpGetAllLists(req, res) {
  const result = await getAllLists(req.user.userId);

  return sendSuccess(res, { data: result });
}

async function httpGetListById(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  const result = await getListById({ userId, listId });

  return sendSuccess(res, {
    data: result,
  });
}

async function httpCreateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;

  const result = await createList({ userId, name });

  return sendSuccess(res, {
    data: result,
    status: 201,
  });
}

async function httpUpdateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;
  const listId = req.params.id;

  const result = await updateList({ userId, listId, name });

  return sendSuccess(res, {
    data: result,
  });
}

async function httpDeleteList(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  const result = await deleteList({ userId, listId });

  return sendSuccess(res, {
    data: result,
  });
}

module.exports = {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
};
