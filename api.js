const express = require('express')
const mongoose = require('mongoose')
const paymentController = require('./controllers/paymentController');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/finances')
    .then((result) => app.listen(3000))
    .catch((error) => console.log("error"))


app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());

//Payments
app.post(`/payment`, paymentController.createPayment);
app.put(`/payment`, paymentController.editPayment);
app.delete(`/payment`, paymentController.deletePayment);
app.get(`/payment`, paymentController.getPayment)
app.get(`/findPayment`, paymentController.findPayments);

//...