const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");
const userService = require("../services/user.service");

async function createOrder(user, shipAddress) {
  let address;
  if (shipAddress._id) {
    let existingAddress = await Address.findById(shipAddress._id);
    address = existingAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user.id;
    await address.save();
    const originalUser = await userService.findUserById(user.id);
    originalUser.address.push(address);
    await originalUser.save();
  }
  const cart = await cartService.findUserCart(user);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      discountedPrice: item.discountedPrice,
      size: item.size,
      userId: user.id,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }
  const createdOrder = new Order({
    user: user.id,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: Math.ceil(
      ((cart.totalPrice - cart.totalDiscountedPrice) / cart.totalPrice) * 100
    ),
    totalItem: cart.totalItem,
    shippingAddress: address._id,
  });

  const savedOrder = await createdOrder.save();
  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");

    return order;
  } catch (e) {
    throw new Error(`Order not found with id ${orderId}`);
  }
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (e) {
    throw new Error(`Error finding user's order history for user ${userId}`);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({
      path: "orderItems",
      populate: { path: "product" },
    })
    .lean();
}

async function deleteOrder(orderId) {
  await Order.findByIdAndDelete(orderId);
}

module.exports = {
  createOrder,
  placeOrder,
  deleteOrder,
  confirmOrder,
  getAllOrders,
  usersOrderHistory,
  findOrderById,
  cancelledOrder,
  shipOrder,
  deliveredOrder,
};
