let counter = 0;

function createUser(overrides = {}) {
  counter++;

  return {
    username: `testUser${counter}`,
    email: `testUser${counter}@example.com`,
    password: "123",
    ...overrides,
  };
}

module.exports = {
  createUser,
};
