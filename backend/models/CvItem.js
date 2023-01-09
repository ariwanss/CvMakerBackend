const mongoose = require('mongoose');

const cvItemSchema = new  mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  section: {
    type: String,
    required: true,
    ref: 'CvSection'
  },
  title: {
    type: String,
    required: true
  },
  timeStart: String,
  timeEnd: String,
  link: String,
  description: [String]
});

module.exports = mongoose.model('CvItem', cvItemSchema);