const mongoose = require('mongoose');

const chickPaymentSchema = new mongoose.Schema({
  dueDate: {
    type: Date,
    required: true
  },
  farmer: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('chickPayment', chickPaymentSchema);