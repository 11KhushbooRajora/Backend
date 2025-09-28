const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productUrl: {
    type: String,
    required: true, 
  },
  productName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  productColor: [{
    type: String, 
    enum: ["Blue", "Red", "Green", "Orange", "Black"], // only allowed colors
  }],
productSize: [ 
  {
    type: Number,
    enum: [7, 8, 9, 10, 11],
  }
],

  productPrice: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
