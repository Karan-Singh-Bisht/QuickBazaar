const ratingService = require("../services/rating.service");

const createRating = async (req, res) => {
  try {
    const user = req.user;
    const rating = await ratingService.createRating(req.body, user);
    return res.status(201).json(rating);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const productId = req.params.productId;
    const rating = await ratingService.getProductRating(productId);
    return res.status(200).json(rating);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const response = await ratingService.deleteRating(ratingId);
    return res.status(200).json({ message: response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createRating, getAllRatings, deleteRating };
