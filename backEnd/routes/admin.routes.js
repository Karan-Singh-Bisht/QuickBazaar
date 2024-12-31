const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  confirmedOrder,
  shippedOrder,
  deliveredOrder,
  cancelledOrder,
  deleteOrder,
} = require("../controllers/adminOrder.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.get("/", verifyUserToken, getAllOrders);
router.put("/:orderId/confirmed", verifyUserToken, confirmedOrder);
router.put("/:orderId/shipped", verifyUserToken, shippedOrder);
router.put("/:orderId/deliver", verifyUserToken, deliveredOrder);
router.put("/:orderId/cancel", verifyUserToken, cancelledOrder);
router.put("/:orderId/delete", verifyUserToken, deleteOrder);

module.exports = router;
