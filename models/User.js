const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phoneNumber: {
    type: String, // Changed to String to handle leading zeros
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  recommenderName: {
    type: String,
    required: true,
    trim: true
  },
  recommenderNin: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['YoungFarmer', 'SalesRep', 'BrooderManager'],
    required: true
  },
  farmerDob: {
    type: Date,
    required: function() { return this.role === 'YoungFarmer'; } // Required only for farmers
  },
  farmerNin: {
    type: String,
    required: function() { return this.role === 'YoungFarmer'; },
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);