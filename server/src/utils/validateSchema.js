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

module.exports = validate;
