const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  date: Date,
  totalChicks: Number,
  farmer: String,
  salesRep: String,
  amount: Number,
  type: { type: String, enum: ['chick', 'feed'], default: 'chick' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Request', requestSchema);

