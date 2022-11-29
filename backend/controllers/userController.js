const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }
  const isEmailAlreadyRegistered = await User.exists({ email }) == ! null;
  if (isEmailAlreadyRegistered) {
    res.status(400);
    throw new Error('Email already registered');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const { password: savedPassword, ...user } = await User.create({
    name,
    email,
    password: hashedPassword
  });
  if (user) {
    res.json({
      ...user,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('User not created');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }
  const { password: savedPassword, ...user } = await User.findOne({ email });
  if (user && await bcrypt.compare(password, savedPassword)) {
    res.json({
      ...user,
      token: generateToken(user._id)
    });
  } else if (!user) {
    res.status(400);
    throw new Error('User not registered');
  } else {
    res.status(400);
    throw new Error('Incorrect password');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const update = req.body;
  const user = await User.findByIdAndUpdate(_id, update, { new: true }).select('-password');
  res.json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
  createUser,
  loginUser,
  updateUser
};