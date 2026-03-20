const z = require("zod");
const { email, username, password } = require("./auth.schema");

const registerSchema = z.object({
  username,
  email,
  password,
});

const signInSchema = z.object({
  identifier: z.string().min(3),
  password,
});

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issue = result.error.issues[0];

      return res.status(400).json({
        error: "VALIDATION_ERROR",
        field: issue.path?.[0] || null,
        message: issue.message,
      });
    }

    req.body = result.data;

    next();
  };
}

module.exports = {
  registerSchema,
  signInSchema,
  validate,
};
