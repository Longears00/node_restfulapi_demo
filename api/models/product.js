
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

let Product = module.exports = mongoose.model('Product', productSchema);
