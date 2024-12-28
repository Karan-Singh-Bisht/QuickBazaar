const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/auth.controller");

router.post("/signup", registerUser);
router.post("/signin", login);

module.exports = router;
