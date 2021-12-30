const mongoose = require('mongoose')

let bankShcema = mongoose.Schema({
    name: {
        type: String,
        require:[true, 'Nama pemilik harus di isi']
    },
    nameBank: {
        type: String,
        require:[true, 'Nama bank harus di isi']
    },
    nomorRekening: {
        type: String,
        require:[true, 'Nomor rekening bank harus di isi']
    },
})

module.exports = mongoose.model('Bank', bankShcema)