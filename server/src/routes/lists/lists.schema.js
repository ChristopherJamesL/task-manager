const z = require("zod");

const name = z.string().min(1).max(50);

const createListSchema = z.object({
  name,
});

const updateListSchema = z.object({
  name,
});

const listIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

module.exports = {
  createListSchema,
  updateListSchema,
  listIdParamSchema,
};
