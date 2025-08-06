const mongoose = require('mongoose');

const chickRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  totalChicks: {
    type: Number,
    required: true
  },
  farmer: {
    type: String,
    required: true
  },
  salesRep: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('ChickRequest', chickRequestSchema);
