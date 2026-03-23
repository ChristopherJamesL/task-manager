const validate = require("../../utils/validateSchema");
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
