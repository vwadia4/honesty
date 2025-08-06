//const {text} = require('express');
//const {farmerRegistration} = require('../routes/farmerRegistration');
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  user:{ 
    type: mongoose.Schema.Types.Object,
        ref: 'farmerRegistration',
    required: true
},
  gender: { 
    type: String,
    required: true
  },
  farmerDob: {
    type: Date,
    required: true
  },
  contact: {
  type: String,
  required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  farmerNin: {
    type: String,
    required: true
  },
  recommenderName: {
    type: String,
    required: true
  },
  recommenderNin: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('farmer', farmerSchema);



