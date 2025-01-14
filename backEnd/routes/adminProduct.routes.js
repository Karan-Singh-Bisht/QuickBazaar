const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProduct,
  findProductById,
} = require("../controllers/product.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.post("/", verifyUserToken, createProduct);
router.post("/create", verifyUserToken, createMultipleProduct);
router.delete("/:productId/delete", verifyUserToken, deleteProduct);
router.put("/:productId", verifyUserToken, updateProduct);

module.exports = router;
