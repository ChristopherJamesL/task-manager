const { normalizeIdentifier } = require("../../src/utils/normalizeIdentifier");

function normalizeAuthInput(req, res, next) {
  if (req.body.identifier)
    req.body.identifier = normalizeIdentifier(req.body.identifier);

  if (req.body.email) req.body.email = normalizeIdentifier(req.body.email);

  next();
}

module.exports = normalizeAuthInput;
