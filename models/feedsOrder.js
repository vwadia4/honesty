const mongoose = require('mongoose');

const feedsOrderSchema = new mongoose.Schema({
  // define your fields here
  feedType: String,
  quantity: Number,
  price: Number,
  orderDate: Date,
});

module.exports = mongoose.model('FeedsOrder', feedsOrderSchema);
