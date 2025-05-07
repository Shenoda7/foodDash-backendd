const productModel = require("../models/Product");

const getAllProducts = function (req, res) {
  productModel
    .find()
    .then((products) => {
      res.status(200);
      res.json({
        status: 200,
        data: products,
        message: "Products found",
      });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        status: 400,
        data: null,
        message: "Products not found",
      });
    });
};

const addNewProduct = function (req, res) {
  const { img, name, rating, numOfRating, price, tag } = req.body;
  const newProduct = new productModel({
    img,
    name,
    rating,
    numOfRating,
    price,
    tag,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201);
      res.json({
        status: 201,
        data: null,
        message: "Product created",
      });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        status: 400,
        data: null,
        message: err.message,
      });
    });
};

const deleteProduct = function (req, res) {
  const { id } = req.params;
  productModel.findByIdAndDelete(id).then(() => {
    res.status(200);
    res.json({
      status: 200,
      data: null,
      message: "Product deleted",
    });
  });
};

const updateProduct = function (req, res) {
  const { id } = req.params;
  const { img, name, rating, numOfRating, price, tag } = req.body;
  productModel
    .findByIdAndUpdate(id, {
      img,
      name,
      rating,
      numOfRating,
      price,
      tag,
    })
    .then(() => {
      res.status(200);
      res.json({
        status: 200,
        data: null,
        message: "Product updated",
      });
    });
};

module.exports = {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
};
