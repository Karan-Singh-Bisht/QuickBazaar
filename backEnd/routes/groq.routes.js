const express = require("express");
const router = express.Router();
const { chatWithGroq } = require("../controllers/groq.controller");

router.post("/", chatWithGroq);

module.exports = router;
