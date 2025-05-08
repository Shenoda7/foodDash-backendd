const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  numOfRating: { type: Number, required: false, default: 10 },
  price: { type: Number, required: true },
  rating: { type: Number, required: false, default: 4 },
  tag: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
