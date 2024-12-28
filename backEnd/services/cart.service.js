const Cart = require("../models/cart.model");

async function createCart(user) {
  try {
    const cart = new Cart({ user: user._id });
    const createdCart = await cart.save();
    if (!createdCart) {
      throw new Error("Failed to create cart");
    }
    return createdCart;
  } catch (e) {
    throw e;
  }
}

module.exports = { createCart };
