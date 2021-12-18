const mongoose = require('mongoose')

let categoryShcema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama kategori harus di isi']
    }
})

module.exports = mongoose.model('Category', categoryShcema)