const z = require("zod");

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(3),
});

const signInSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({ error: err.errors[0].message });
    }
  };
}

module.exports = {
  registerSchema,
  signInSchema,
  validate,
};
