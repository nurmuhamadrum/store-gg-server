const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = ''
            const alertStatus = false

            const alert = { message: alertMessage, status: alertStatus }
            const payment = await Payment.find().populate('banks')

            res.render('admin/payment/view_payment', {
                payment,
                alert
            })

        } catch (error) {
            res.redirect('/payment');
        }
    },

    viewCreate: async (req, res) => {
        try {
            const bank = await Bank.find()
            await res.render('admin/payment/create', {
                bank
            });

        } catch (error) {
            res.redirect('/payment');
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { banks, type } = req.body;

            let payment = await Payment({ banks, type });
            await payment.save();

            res.redirect('/payment');
        } catch (error) {
            res.redirect('/payment');;
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await Payment.findOne({ _id: id }).populate('banks')

            res.render('admin/payment/edit', {
                payment
            });

        } catch (error) {
            res.redirect('/payment');
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { banks, type } = req.body;

            await Payment.findByIdAndUpdate({
                _id: id
            }, { banks, type });

            res.redirect('/payment');

        } catch (error) {
            res.redirect('/payment');
        }
    },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Payment.findByIdAndRemove({
                _id: id
            });

            res.redirect('/payment');
        } catch (error) {
            res.redirect('/payment');
        }
    }
}