const groqService = require("../services/groq.service");

async function chatWithGroq(req, res) {
  try {
    const { message } = req.body;
    const response = await groqService.getGroqResponse(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { chatWithGroq };
