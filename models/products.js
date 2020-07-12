const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String,required: true,trim: true},
    description: {type: String, required: true,trim: true},
    category: {type: String,default: 'others',required: true},
    price: {type: Number,required: true},
    quantity: {type: Number,required:true},
    image: {type: Buffer,required: true},
    custom: [
        {name: {type: String}, value: {type: mongoose.Schema.Types.Mixed}}
    ]

})

const Product = mongoose.model('Product',productSchema)

module.exports = Product