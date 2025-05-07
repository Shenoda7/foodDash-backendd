const userModel = require("../models/User");
const jwtDecode = require("jwt-decode");
const getCart = function (req, res) {
  const id = req.body.id;
  userModel
    .findById(id)
    .then((user) => {
      res.status(200);
      res.json({
        status: 200,
        data: user.cart,
        message: "Cart found",
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

const UpdateCart = function (req, res) {
  const { cart, id } = req.body;

  userModel
    .findByIdAndUpdate(id, { cart: cart })
    .then(() => {
      res.status(200).json({
        status: 200,
        data: null,
        message: "Cart updated",
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

module.exports = { getCart, UpdateCart };
