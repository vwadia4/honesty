const mongoose = require('mongoose');

const chickPaymentSchema = new mongoose.Schema({
  dueDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('ChickPayment', chickPaymentSchema);