const reviewService = require("../services/review.service");

const createReview = async (req, res) => {
  try {
    const user = req.user;
    const reviewData = req.body;
    const newReview = await reviewService.createReview(user, reviewData);
    if (!newReview) {
      return res.status(400).json({ message: "Invalid data" });
    }
    return res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Error creating review" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await reviewService.getAllReviews(productId);
    return res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

module.exports = { createReview, getAllReviews };
