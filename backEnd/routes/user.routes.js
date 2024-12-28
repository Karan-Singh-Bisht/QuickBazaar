const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getAllUsers,
} = require("../controllers/user.controller");
const { verifyUserToken } = require("../middlewares/verifyUserToken");

router.get("/profile", getUserProfile);
router.get("/", getAllUsers);

module.exports = router;
