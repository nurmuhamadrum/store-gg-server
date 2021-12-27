const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = ''
            const alertStatus = false
            
            const alert = { message: alertMessage, status: alertStatus }
            const voucher = await Voucher.find()
            .populate('category')
            .populate('nominals')

            

            res.render('admin/voucher/view_voucher', {
                voucher,
                alert
            })
            
        } catch (error) {
            res.redirect('/voucher');
        }
    },

    viewCreate: async (req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()

            await res.render('admin/voucher/create', {
                category,
                nominal
            });

        } catch (error) {
            res.redirect('/voucher');
        }
    },

    actionCreate: async (req, res) => {
        try {
            const { name, category, nominals } = req.body;

            if (req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        await voucher.save();

                        res.redirect('/voucher');
                    } catch (error) {
                        res.redirect('/nominal');
                    }
                })
            } else {
                const voucher = new Voucher({
                    name,
                    category,
                    nominals
                })

                await voucher.save();

                res.redirect('/voucher');
            }
        } catch (error) {
            res.redirect('/nominal');;
        }
    },

    // viewEdit: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const nominal = await Nominal.findOne({ _id: id });

    //         res.render('admin/nominal/edit', {
    //             nominal
    //         });

    //     } catch (error) {
    //         res.redirect('/nominal');
    //     }
    // },

    // actionEdit: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { coinName, coinQuantity, price } = req.body;

    //         await Nominal.findByIdAndUpdate({
    //             _id: id
    //         }, { coinName, coinQuantity, price });

    //         res.redirect('/nominal');

    //     } catch (error) {
    //         res.redirect('/nominal');
    //     }
    // },

    // actionDelete: async (req, res) => {
    //     try {
    //         const { id } = req.params;

    //         await Nominal.findByIdAndRemove({
    //             _id: id
    //         });

    //         res.redirect('/nominal');
    //     } catch (error) {
    //         res.redirect('/nominal');
    //     }
    // }
}