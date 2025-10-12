const errorMessages = require('./errorMessages');

module.exports = function errorResponse(res, code, key, lang = 'id') {
  const message = errorMessages[key]?.[lang] || errorMessages[key]?.en || key;
  res.status(code).json({
    error: key,
    message
  });
};