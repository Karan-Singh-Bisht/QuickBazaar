const express = require("express");
const router = express.Router();

const {
  createRating,
  getAllRatings,
} = require("../controllers/rating.controller");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.post("/createRating", verifyUserToken, createRating);
router.get("/product/:productId", verifyUserToken, getAllRatings);

module.exports = router;
