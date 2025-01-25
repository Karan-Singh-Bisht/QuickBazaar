const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

async function createRating(req, user) {
  const product = await productService.findProductById(req.productId);
  const rating = new Rating({
    user: user.id,
    product: product._id,
    rating: req.rating,
    review: req.review,
  });
  return await rating.save();
}

async function getProductRating(productId) {
  return await Rating.find({ product: productId }).populate("user");
}

async function deleteRating(reviewId) {
  await Rating.findByIdAndDelete(reviewId);
  return "Review deleted successfully";
}

module.exports = { createRating, getProductRating, deleteRating };
