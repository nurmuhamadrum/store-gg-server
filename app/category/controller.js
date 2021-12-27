const Category = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            // const alertMessage = req.flash('alertMessage')
            // const alertStatus = req.flash('alertStatus')
            const alertMessage = 'alertMessageHere'
            const alertStatus = false
            
            const alert = { message: alertMessage, status: alertStatus }
            const category = await Category.find();

            res.render('admin/category/view_category', {
                category,
                alert
            })
            
        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');
        }
    },

    viewCreate: async (req, res) => {
        try {
            await res.render('admin/category/create');

        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({ name });
            await category.save();

            // req.flash('alertMessage', 'Successfully added category');
            // req.flash('alertStatus', 'success')
            res.redirect('/category');

        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');;
        }
    },

    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });

            res.render('admin/category/edit', {
                category
            });

        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');
        }
    },

    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body

            await Category.findByIdAndUpdate({
                _id: id
            }, { name });

            // req.flash('alertMessage', 'Successfully edit category');
            // req.flash('alertStatus', 'success')
            res.redirect('/category');

        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');
        }
    },

    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;

            await Category.findByIdAndRemove({
                _id: id
            });

            // req.flash('alertMessage', 'Successfully delete category');
            // req.flash('alertStatus', 'success')
            res.redirect('/category');

        } catch (error) {
            // req.flash('alertMessage', `${error.message}`)
            // req.flash('alertStatus', 'danger')
            res.redirect('/category');
        }
    }
}