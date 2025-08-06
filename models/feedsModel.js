const mongoose = require('mongoose');

const feedsSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true
  },
  amountFeeds: {
    type: String,
    required: true
  },
  feedCost: {
    type: Number,
    required: true
  },
  feedDate: {
    type: Date,
    required: true
  },
  nextFeeds: {
    type: Date
  },
  comment:{
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('feeds', feedsSchema);