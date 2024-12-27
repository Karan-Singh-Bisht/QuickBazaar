const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickBazaar`);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error connecting to MongoDB:", e);
    process.exit(1);
  }
};

module.exports = db;
