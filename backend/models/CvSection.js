const mongoose = require('mongoose');

const cvSectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('CvSection', cvSectionSchema);