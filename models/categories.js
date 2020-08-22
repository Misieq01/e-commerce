const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: { type: String },
  active: { type: Boolean, default: true },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Category = mongoose.model('Category',categorySchema)

module.exports = Category