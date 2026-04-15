const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeIdentifier(identifier) {
  if (!identifier) return identifier;

  const trimmed = identifier.trim();

  const isEmail = EMAIL_REGEX.test(trimmed);

  return isEmail ? trimmed.toLowerCase() : trimmed;
}

module.exports = {
  normalizeIdentifier,
};
