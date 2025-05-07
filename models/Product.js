const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  numOfRating: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  tag: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
