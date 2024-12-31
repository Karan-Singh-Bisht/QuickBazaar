const Rating = require("../models/rating.model");
const productService = require("../services/product.service");

async function createRating(req, user) {
  const product = await productService.findProductById(req.productId);
  const rating = new Rating({
    userId: user._id,
    productId: product._id,
    rating: req.rating,
  });
  return await rating.save();
}

async function getProductRating(productId) {
  return await Rating.find({ product: productId });
}

module.exports = { createRating, getProductRating };
