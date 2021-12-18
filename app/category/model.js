const mongoose = require('mongoose')

let categoryShcema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Category name must be filled']
    }
})

module.exports = mongoose.model('Category', categoryShcema)