const validate = require("../../utils/validateSchema");
const { createListSchema, updateListSchema } = require("./lists.schema");

module.exports = {
  validate,
  createListSchema,
  updateListSchema,
};
