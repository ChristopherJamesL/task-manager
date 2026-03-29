const validate = require("../../middleware/validateSchema");
const { registerSchema, signInSchema } = require("./auth.schema");

module.exports = {
  validate,
  registerSchema,
  signInSchema,
};
