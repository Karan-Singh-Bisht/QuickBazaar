const express = require("express");
const router = express.Router();

const {
  createOrder,
  findOrderById,
  orderHistory,
} = require("../controllers/order.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.post("/", verifyUserToken, createOrder);
router.get("/user", verifyUserToken, orderHistory);
router.get("/:orderId", verifyUserToken, findOrderById);

module.exports = router;
