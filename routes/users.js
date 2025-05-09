const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getCart, UpdateCart } = require("../controllers/userController");

router.get("/cart", getCart);
router.put("/cart", UpdateCart);

router.use("/", (req, res) => {
  res.status(400).json({
    status: 400,
    data: null,
    message: "Invalid request",
  });
});

module.exports = router;
