const {
  getAllLists,
  getListById,
  createList,
  updateListName,
  deleteList,
} = require("../../models/lists.model");

async function httpGetAllLists(req, res) {
  const userId = req.user.userId;

  try {
    const lists = await getAllLists(userId);
    res.status(200).json({ lists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch lists" });
  }
}

async function httpGetListById(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  try {
    const list = await getListById(userId, listId);

    if (!list) return res.status(404).json({ error: "List not found" });

    res.status(200).json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch list" });
  }
}

async function httpCreateList(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;

  try {
    const newList = await createList(userId, name);

    res.status(201).json({ message: "List created", list: newList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create list" });
  }
}

async function httpUpdateListName(req, res) {
  const userId = req.user.userId;
  const { name } = req.body;
  const listId = req.params.id;

  try {
    const updatedList = await updateListName(userId, listId, name);

    if (!updatedList) return res.status(404).json({ error: "List not found" });

    res.status(200).json({ message: "List updated", list: updatedList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update list" });
  }
}

async function httpDeleteList(req, res) {
  const userId = req.user.userId;
  const listId = req.params.id;

  try {
    const deletedList = await deleteList(userId, listId);

    if (!deletedList) return res.status(404).json({ error: "List not found" });

    res.status(200).json({ message: "List deleted", list: deletedList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete list" });
  }
}

module.exports = {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateListName,
  httpDeleteList,
};
