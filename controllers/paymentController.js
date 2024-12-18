const Payment = require('../models/payment');

const createPayment = (req,res) => {
    const payment = new Payment ({
        quantity: req.body.quantity,
        category: req.body.category,
        month: req.body.month,
        year: req.body.year,
        type: req.body.type
    });

    payment.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })

}

const editPayment = (req,res) => {
    Payment.updateOne({ _id: req.body._id }, {
        quantity: req.body.quantity,
        category: req.body.category,
        month: req.body.month,
        year: req.body.year,
        type: req.body.type
    })

    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
}

const deletePayment = (req,res) => {

    Payment.deleteOne({_id:req.body._id}, {})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

}

const getPayment = (req,res) => {

    Payment.findById(req.body._id)
    .then((result) => {
        console.log(result);
        if (result == null) {
            res.status(404).json({
                erro:"Dado nao encontrado."
            });
        }
        else {      
        res.send(result);
        }

    })
    .catch((err) => {
        console.log(err);
    });

}

module.exports = {
    createPayment, 
    editPayment,
    deletePayment,
    getPayment
}