const Nominal = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = ''
            const alertStatus = false

            const alert = { message: alertMessage, status: alertStatus }
            const nominal = await Nominal.find();

            res.render('admin/nominal/view_nominal', {
                nominal,
                alert
            })

        } catch (error) {
            res.redirect('/nominal');
        }
    },

    viewCreate: async (req, res) => {
        try {
            await res.render('admin/nominal/create');

        } catch (error) {
            res.redirect('/nominal');
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body;
            let nominal = await Nominal({ coinName, coinQuantity, price });
            await nominal.save();

            res.redirect('/nominal');
        } catch (error) {
            res.redirect('/nominal');;
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const nominal = await Nominal.findOne({ _id: id });

            res.render('admin/nominal/edit', {
                nominal
            });

        } catch (error) {
            res.redirect('/nominal');
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinName, coinQuantity, price } = req.body;

            await Nominal.findByIdAndUpdate({
                _id: id
            }, { coinName, coinQuantity, price });

            res.redirect('/nominal');

        } catch (error) {
            res.redirect('/nominal');
        }
    },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Nominal.findByIdAndRemove({
                _id: id
            });

            res.redirect('/nominal');
        } catch (error) {
            res.redirect('/nominal');
        }
    }
}