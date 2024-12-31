const cartService = require("./cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");

async function createOrder(user, shipAddress) {
  let address;
  if (shipAddress._id) {
    let existingAddress = await Address.findById(shipAddress._id);
    address = existingAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();
    user.addresses.push(address);
    await user.save();
  }
  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      discountedPrice: item.discountedPrice,
      size: item.size,
      userId: item.userId,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }
  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    totalItem: cart.totalItem,
    shippingAddress: address,
    address,
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
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  deleteOrder,
  confirmOrder,
  getAllOrders,
  usersOrderHistory,
  cancelledOrder,
  shipOrder,
  deliveredOrder,
};
