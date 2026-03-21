const validate = require("../../utils/validateSchema");
const { registerSchema, signInSchema } = require("./auth.schema");

module.exports = {
  validate,
  registerSchema,
  signInSchema,
};
