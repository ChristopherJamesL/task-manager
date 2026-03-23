function validate(schema, source = "body") {
  return (req, res, next) => {
    const data = req[source];

    const result = schema.safeParse(data);

    if (!result.success) {
      const issue = result.error.issues[0];

      return res.status(400).json({
        error: "VALIDATION_ERROR",
        field: issue.path?.[0] || null,
        message: issue.message,
      });
    }

    req[source] = result.data;

    next();
  };
}

module.exports = validate;
