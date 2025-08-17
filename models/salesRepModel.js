const mongoose = require('mongoose');

const salesRepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repGender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  repDob: {
    type: Date,
    required: true
  },
  repContact: {
    type: String,
    required: true
  },
  repEmail: {
    type: String,
    required: true,
    unique: true
  },
  repNin: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  subCounty: {
    type: String,
    required: true
  },
  parish: {
    type: String,
    required: true
  },
  village: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SalesRep', salesRepSchema);