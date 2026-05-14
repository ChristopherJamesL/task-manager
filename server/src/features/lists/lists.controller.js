const { sendSuccess } = require("../../utils/response");
const {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
} = require("./lists.service");

async function httpGetAllLists(req, res) {
  const lists = await getAllLists(req.user.userId);

  return sendSuccess(res, { data: { lists } });
}

async function httpGetListById(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  const list = await getListById({ userId, listId });

  return sendSuccess(res, {
    data: { list },
  });
}

async function httpCreateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;

  const list = await createList({ userId, name });

  return sendSuccess(res, {
    data: { list },
    status: 201,
  });
}

async function httpUpdateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;
  const listId = req.params.id;

  const list = await updateList({ userId, listId, name });

  return sendSuccess(res, {
    data: { list },
  });
}

async function httpDeleteList(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  const list = await deleteList({ userId, listId });

  return sendSuccess(res, {
    data: { list },
  });
}

module.exports = {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
};
