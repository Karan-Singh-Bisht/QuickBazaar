const Review = require("../models/review.model");
const productService = require("../services/product.service");

async function createReview(reqData, user) {
  const product = await productService.findProductById(reqData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const review = new Review({
    userId: user._id,
    productId: product._id,
    title: reqData.title,
    content: reqData.content,
    rating: reqData.rating,
  });

  await product.save(); //
  return await review.save();
}

async function getAllReviews(productId) {
  const product = await productService.findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return await Review.find({ productId: product._id }).populate("user");
}

// async function deleteReview(reviewId) {
//   const review = await Review.findByIdAndDelete(reviewId);
//   if (!review) {
//     throw new Error("Review not found");
//   }
// }

module.exports = { createReview, getAllReviews };
