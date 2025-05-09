const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.use("/", (req, res) => {
  res.status(400).json({
    status: 400,
    data: null,
    message: "Invalid request",
  });
});

module.exports = router;
