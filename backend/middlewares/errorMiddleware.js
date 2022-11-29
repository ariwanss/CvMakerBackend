const asyncHandler = require('express-async-handler');

const errorHandler = asyncHandler(async (err, req, res, next) => {
  let status = res.status ? res.status : 500;
  res.status(status).json({ error: err.message });
});

module.exports = { errorHandler }