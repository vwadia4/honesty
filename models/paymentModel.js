const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  dueDate: Date,
  farmer: String,
  amount: Number
});

module.exports = mongoose.model('Payment', paymentSchema);
