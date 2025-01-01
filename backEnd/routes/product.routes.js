const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  findProductById,
} = require("../controllers/product.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.get("/", verifyUserToken, getAllProducts);
router.get("/id/:productId", verifyUserToken, findProductById);

module.exports = router;
