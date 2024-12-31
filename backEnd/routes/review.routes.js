const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
} = require("../controllers/review.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.post("/createReview", verifyUserToken, createReview);
router.get("/product/:productId", verifyUserToken, getAllReviews);

module.exports = router;
