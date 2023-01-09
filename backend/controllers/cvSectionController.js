const CvSection = require('../models/CvSection');
const asyncHandler = require('express-async-handler');

const addCvSection = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const cvSection = await CvSection.create({
    section: req.body,
    user
  });
  res.json(cvSection);
})

const getCvSections = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const cvSections = await CvSection.find({ user });
  res.json(cvSections);
})

const updateCvSection = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const { _id, update } = req.body;
  const cvSection = await CvSection.findById(_id);
  if (!cvSection) {
    res.status(400);
    throw new Error('Cv Section not found');
  }
  if (cvSection.user !== user) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  cvSection = await CvSection.findByIdAndUpdate(_id, { section: update }, { new: true });
  res.json(cvSection);
})

const deleteCvSection = asyncHandler(async (req, res) => {
  const { _id: user } = req.user;
  const { _id } = req.body;
  const cvSection = await CvSection.findById(_id);
  if (!cvSection) {
    res.status(400);
    throw new Error('Cv Section not found');
  }
  if (cvSection.user !== user) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  const deleted = await CvSection.deleteOne({ _id });
  res.json({ _id })
})

module.exports = {
  addCvSection,
  getCvSections,
  updateCvSection,
  deleteCvSection
}