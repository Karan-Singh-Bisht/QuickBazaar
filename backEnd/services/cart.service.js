const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
  try {
    const cart = new Cart({ user: user.id });
    const createdCart = await cart.save();
    if (!createdCart) {
      throw new Error("Failed to create cart");
    }
    return createdCart;
  } catch (e) {
    throw e;
  }
}

async function findUserCart(user) {
  try {
    let cart = await Cart.findOne({ user: user.id });
    let cartItems = await CartItem.find({ cart: cart.id }).populate("product");
    cart.cartItems = cartItems;

    // let discount = 0;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalDiscount = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      discount = cartItem.price - cartItem.discountedPrice;
      totalPrice += cartItem.price;
      totalDiscount += discount;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.discount = totalDiscount;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItem = totalItem;

    return cart;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    if (!isPresent) {
      const cartItem = new CartItem({
        cart: cart._id,
        product: product._id,
        size: req.size,
        quantity: req.quantity,
        discountedPrice: product.discountedPrice,
        price: product.price,
        userId,
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return "Item saved successfully";
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { createCart, findUserCart, addCartItem };
