const validate = require("../../middleware/validateSchema");
const {
  createListSchema,
  updateListSchema,
  listIdParamSchema,
} = require("./lists.schema");

module.exports = {
  validate,
  createListSchema,
  updateListSchema,
  listIdParamSchema,
};
