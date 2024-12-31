const userService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("Item not found :", cartItemId);
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("User not found :", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("Unauthorized to update this item");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(cartItem.userId);
    if (user._id.toString() === userId.toString()) {
      await cartItem.findByIdAndDelete(cartItemId);
      return "Item removed from cart successfully";
    } else {
      throw new Error("Unauthorized to remove this item");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findCartItemById(cartItemId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      throw new Error("Invalid Cart Item ID");
    }
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      throw new Error("Item not found");
    }
    return cartItem;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
