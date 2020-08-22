const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: { type: Number },
  active: { type: Boolean },
});

const Product = mongoose.model('Product',productSchema)

module.exports = Product