const z = require("zod");

const name = z.string().min(1).max(50);

const createListSchema = z.object({
  name,
});

const updateListSchema = z.object({
  name,
});

module.exports = {
  createListSchema,
  updateListSchema,
};
