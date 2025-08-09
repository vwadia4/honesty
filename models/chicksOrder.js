const mongoose = require('mongoose');

const chicksOrderSchema = new mongoose.Schema({
  // define your schema fields here
  name: String,
  quantity: Number,
  price: Number,
  // etc.
});

module.exports = mongoose.model('ChicksOrder', chicksOrderSchema);
