const validate = require("../../middleware/validateSchema");
const {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
  taskIdParamSchema,
} = require("./tasks.schema");

module.exports = {
  validate,
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
  taskIdParamSchema,
};
