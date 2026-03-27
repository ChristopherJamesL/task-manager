const { sendError } = require("./response");

function validate(schema, source = "body") {
  return (req, res, next) => {
    const data = req[source];

    const result = schema.safeParse(data);

    if (!result.success) {
      const issue = result.error.issues[0];

      return sendError(res, {
        message: issue.message,
        field: issue.path?.[0] || null,
        status: 400,
      });
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
