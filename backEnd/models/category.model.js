const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  level: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
