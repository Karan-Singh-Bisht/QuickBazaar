const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const shipAddress = req.body.shipAddress;
    const createdOrder = await orderService.createOrder(user, shipAddress);
    return res.status(201).json(createdOrder);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const orderHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderService.usersOrderHistory(userId);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,
};
