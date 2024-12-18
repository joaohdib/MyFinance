const express = require('express')
const mongoose = require('mongoose')
const paymentController = require('./controllers/paymentController');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/finances')
    .then((result) => app.listen(3000))
    .catch((error) => console.log("error"))


app.set('view engine', 'ejs');
app.use(express.json());


app.post(`/payment`, paymentController.createPayment);
app.put(`/payment`, paymentController.editPayment);
app.delete(`/payment`, paymentController.deletePayment);
app.get(`/payment`, paymentController.getPayment)