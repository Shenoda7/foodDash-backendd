const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    img:          String,
    name:         { type: String, required: true },
    numOfRating:  Number,
    price:        Number,
    rating:       Number,
    tag:          String
});

module.exports = mongoose.model("Product", productSchema);
