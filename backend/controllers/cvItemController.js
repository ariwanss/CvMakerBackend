const CvItem = require('../models/CvItem');
const asyncHandler = require('express-async-handler');

const createCvItem = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const entry = req.body;
  const cvItem = await CvItem.create({
    user,
    ...entry
  });
  res.json(cvItem);
});

const getCvItems = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const cvItems = await CvItem.find({ user: user });
  res.json(cvItems);
});

const updateCvItem = asyncHandler(async (req, res) => {
  const { _id, ...update } = req.body;
  let cvItem = await CvItem.findById(_id);
  if (!cvItem) {
    res.status(400);
    throw new Error('Cv item not found');
  }
  if (cvItem.user !== req.user._id) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  cvItem = await CvItem.findByIdAndUpdate(_id, update, { new: true });
  res.json(cvItem);
});

const deleteCvItem = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const cvItem = await CvItem.findById(_id);
  if (!cvItem) {
    res.status(400);
    throw new Error('Cv item not found');
  }
  if (cvItem.user !== req.user._id) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  const deleted = await CvItem.deleteOne({ _id: _id });
  res.json({ _id });
});

module.exports = {
  createCvItem,
  getCvItems,
  updateCvItem,
  deleteCvItem
}


