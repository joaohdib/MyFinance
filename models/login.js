const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loginSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required:true,
        minlength: 5,
    },
})

const login = mongoose.model('Login', loginSchema);
module.exports = login;