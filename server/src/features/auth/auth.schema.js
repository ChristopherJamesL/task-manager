const z = require("zod");

const email = z.email();
const username = z.string().min(3).max(20);
const password = z.string().min(3);

const registerSchema = z.object({
  username,
  email,
  password,
});

const signInSchema = z.object({
  identifier: z.string().min(3),
  password,
});

module.exports = {
  registerSchema,
  signInSchema,
};
