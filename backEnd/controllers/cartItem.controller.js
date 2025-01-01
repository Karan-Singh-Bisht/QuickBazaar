const cartItemService = require("../services/cartItem.service");

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.cartItemId;
    const cartItemData = req.body;
    const cartItem = await cartItemService.updateCartItem(
      userId,
      cartItemId,
      cartItemData
    );
    return res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.cartItemId;
    let response = await cartItemService.removeCartItem(userId, cartItemId);
    return res
      .status(200)
      .json({ message: "cartItem removed successfully", response: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateCartItem, removeCartItem };
