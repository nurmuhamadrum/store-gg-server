const Bank = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = ''
            const alertStatus = false

            const alert = { message: alertMessage, status: alertStatus }
            const bank = await Bank.find();

            res.render('admin/bank/view_bank', {
                bank,
                alert
            })

        } catch (error) {
            res.redirect('/bank');
        }
    },

    viewCreate: async (req, res) => {
        try {
            await res.render('admin/bank/create');

        } catch (error) {
            res.redirect('/bank');
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { name, nameBank, nomorRekening } = req.body;
            let banks = await Bank({ name, nameBank, nomorRekening });
            await banks.save();

            res.redirect('/bank');
        } catch (error) {
            res.redirect('/bank');;
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id });

            res.render('admin/bank/edit', {
                bank
            });

        } catch (error) {
            res.redirect('/bank');
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, nameBank, nomorRekening } = req.body;

            await Bank.findByIdAndUpdate({
                _id: id
            }, { name, nameBank, nomorRekening });

            res.redirect('/bank');

        } catch (error) {
            res.redirect('/bank');
        }
    },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Bank.findByIdAndRemove({
                _id: id
            });

            res.redirect('/bank');
        } catch (error) {
            res.redirect('/bank');
        }
    }
}