let counter = 0;
let listCounter = 0;

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

module.exports = {
  createUser,
  createListName,
};
