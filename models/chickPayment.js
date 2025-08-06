const mongoose = require('mongoose');

const chickPaymentSchema = new mongoose.Schema({
  dueDate: {
    type: Date,
    required: true
  },
  farmer: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('chickPayment', chickPaymentSchema);