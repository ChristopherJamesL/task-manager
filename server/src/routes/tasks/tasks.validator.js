const validate = require("../../utils/validateSchema");
const { createTaskSchema, updateTaskSchema } = require("./tasks.schema");

module.exports = {
  validate,
  createTaskSchema,
  updateTaskSchema,
};
