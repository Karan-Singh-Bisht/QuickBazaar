const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/verifyUserToken");

const paymentController = require("../controllers/payment.controller");

router.post("/:id", verifyUserToken, paymentController.createPaymentLink);
router.get("/", verifyUserToken, paymentController.updatePaymentInfo);

module.exports = router;
