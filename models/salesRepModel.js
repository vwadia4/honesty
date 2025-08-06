const mongoose = require('mongoose');

const salesRepresentativeSchema = new mongoose.Schema({
  salesRep:{ 
    type: String,
    required: true
},
  repGender: { 
    type: String,
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
    required: true
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
    type: String,
    required: true
  }
});
module.exports = mongoose.model('salesRepresentative', salesRepresentativeSchema);