const express = require("express");
const router = express.Router();

const {
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartItem.controller");

const verifyUserToken = require("../middlewares/verifyUserToken");

router.put("/:cartItemId", verifyUserToken, updateCartItem);
router.delete("/:cartItemId", verifyUserToken, removeCartItem);

module.exports = router;
