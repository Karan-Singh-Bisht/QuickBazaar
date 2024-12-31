const cartService = require("../services/cart.service");

const findUserCart = async (req, res) => {
  try {
    const cart = await cartService.findUserCart(req.user);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const cartItem = await cartService.addCartItem(req.user.id, req.body);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { findUserCart, addItemToCart };
