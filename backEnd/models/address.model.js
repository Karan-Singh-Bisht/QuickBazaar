const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^\+?[1-9]\d{9,14}$/, // Allows 10-15 digits
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
