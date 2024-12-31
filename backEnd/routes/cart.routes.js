const express = require("express");
const router = express.Router();

const {
  findUserCart,
  addItemToCart,
  createCart,
} = require("../controllers/cart.controller");

const verifyUserToken = require("../middlewares/verifyUserToken");

router.get("/", verifyUserToken, findUserCart);
router.put("/add", verifyUserToken, addItemToCart);

module.exports = router;
