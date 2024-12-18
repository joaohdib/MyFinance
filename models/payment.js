const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const paySchema = new Schema({

    quantity: {
        type: Number,
        required:true 
    },

    category: {
        type: String,
        required:true
    },

    month: { 
        type: Number,
        required:true
    },

    year: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    }
})

const payment = mongoose.model('Payment', paySchema);
module.exports = payment;