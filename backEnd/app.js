require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
db();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to ecommerce API!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
