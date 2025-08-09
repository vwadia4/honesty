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
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
  },
  salesRep: {
    type: String,
    required: true
  },
  amount: {
    type: String, enum: ['pending', 'approved', 'rejected', 'dispatched'], default: 'pending'
    
  }
});

module.exports = mongoose.model('ChickRequest', chickRequestSchema);
