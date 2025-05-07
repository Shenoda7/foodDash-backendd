const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getCart, UpdateCart } = require("../controllers/userController");

router.get("/cart", getCart);
router.put("/cart", UpdateCart);

module.exports = router;
