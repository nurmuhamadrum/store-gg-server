const mongoose = require('mongoose')

let nominalShcema = mongoose.Schema({
    coinQuantity: {
        type: Number,
        default: 0
    },
    coinName: {
        type: String,
        require:[true, 'Nama koin harus di isi']
    },
    price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Nominal', nominalShcema)