const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
    farmername: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    Dob: {
        type: Date,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        
    },
    nin: {
        type: String,
        require: true

    }
});
signupSchema.plugin(passportLocalMongoose, {
usernameField: 'email'
})
module.exports = mongoose.model("signUpModel", signupSchema);