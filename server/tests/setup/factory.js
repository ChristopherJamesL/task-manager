let counter = 0;
let listCounter = 0;
let taskCounter = 0;

function resetCounters() {
  counter = 0;
  listCounter = 0;
  taskCounter = 0;
}

function createUser(overrides = {}) {
  counter++;

  return {
    username: `testUser${counter}`,
    email: `testUser${counter}@example.com`,
    password: "123",
    ...overrides,
  };
}

function createListName(name = "list") {
  listCounter++;

  return `${name}${listCounter}`;
}

function createTaskData({ listId, overrides = {} }) {
  taskCounter++;

  return {
    title: `title${taskCounter}`,
    listId,
    ...overrides,
  };
}

function createTaskUpdateData({
  title,
  description,
  priority,
  isCompleted,
  dueDate,
}) {
  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(priority !== undefined && { priority }),
    ...(isCompleted !== undefined && { isCompleted }),
    ...(dueDate !== undefined && { dueDate }),
  };
}

module.exports = {
  createUser,
  createListName,
  createTaskData,
  createTaskUpdateData,
  resetCounters,
};
