const {
  getAllLists: getAllListsModel,
  getListById: getListByIdModel,
  createList: createListModel,
  updateList: updatedListModel,
  deleteList: deleteListModel,
} = require("./lists.model");
const { NotFoundError, ConflictError } = require("../../utils/errors");

async function getAllLists(userId) {
  const lists = await getAllListsModel(userId);

  return { lists };
}

async function getListById({ userId, listId }) {
  const list = await getListByIdModel(userId, listId);

  if (!list) throw new NotFoundError("List not found");

  return { list };
}

async function createList({ userId, name }) {
  const normalizeName = name.toLowerCase().trim();

  try {
    const list = await createListModel(userId, normalizeName);

    return { list };
  } catch (err) {
    if (err.code === "23505") {
      throw new ConflictError("List name already exists");
    }
    throw err;
  }
}

async function updateList({ userId, name, listId }) {
  const normalizeName = name.toLowerCase().trim();

  try {
    const list = await updatedListModel(userId, listId, normalizeName);

    if (!list) throw new NotFoundError("List not found");

    return { list };
  } catch (err) {
    if (err.code === "23505")
      throw new ConflictError("List name already exists");

    throw err;
  }
}

async function deleteList({ userId, listId }) {
  const list = await deleteListModel(userId, listId);

  if (!list) throw new NotFoundError("List not found");

  return { list };
}

module.exports = {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
};
