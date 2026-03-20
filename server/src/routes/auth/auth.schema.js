const z = require("zod");

const email = z.email();
const username = z.string().min(3).max(20);
const password = z.string().min(3);

module.exports = {
  email,
  username,
  password,
};
