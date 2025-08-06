const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  farmerType: {
    type: String,
    enum: ['newFarmer', 'returnFarmer'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    enum: ['local', 'exotic'],
    required: true
  },
  chickType: {
    type: String,
    enum: ['broiler', 'layer'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', requestSchema);
