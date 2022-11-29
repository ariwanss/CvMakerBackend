const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let { _id } = await User.findById(decoded.id);
      req.user = { _id };
    }
  } catch (error) {
    res.status(401);
    throw new Error('Unauthorized');
  }
});

module.exports = { protect };