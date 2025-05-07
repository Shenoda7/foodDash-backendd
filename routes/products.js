const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", isAdmin, addNewProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

router.use("/", (req, res) => {
  res.status(400).json({
    status: 400,
    data: null,
    message: "Invalid request",
  });
});

module.exports = router;
