const mongoose = require('mongoose');

const feedsSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true
  },
  amountFeeds: {
    type: Number,
    required: true,
    min: 0
  },
  feedCost: {
    type: Number,
    required: true,
    min: 0
  },
  feedDate: {
    type: Date,
    required: true
  },
  nextFeeds: {
    type: Date
  },
  comment: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Dispatched'],
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Feeds', feedsSchema);