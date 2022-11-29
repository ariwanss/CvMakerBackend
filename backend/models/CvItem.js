const mongoose = require('mongoose');

const cvItemSchema = new  mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  section: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  yearStart: Number,
  yearEnd: Number,
  link: String,
  description: [String]
});

module.exports = mongoose.model('CvItem', cvItemSchema);