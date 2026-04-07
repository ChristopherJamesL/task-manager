const { ValidationError } = require("../utils/errors");

function validate(schema, source = "body") {
  return (req, res, next) => {
    const data = req[source];

    const result = schema.safeParse(data);

    if (!result.success) {
      const issue = result.error.issues[0];

      throw new ValidationError(issue.message, issue.path?.[0] || null);
    }

    if (source === "query") {
      res.locals.validatedQuery = result.data;
    } else {
      req[source] = result.data;
    }

    next();
  };
}

module.exports = validate;
