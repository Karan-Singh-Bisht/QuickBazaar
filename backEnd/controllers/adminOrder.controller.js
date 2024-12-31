const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const confirmedOrder = async (req, res) => {
  const { orderId } = req.params.orderId;
  try {
    const orders = await orderService.confirmOrder(orderId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const shippedOrder = async (req, res) => {
  const { orderId } = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deliveredOrder = async (req, res) => {
  const { orderId } = req.params.orderId;
  try {
    const orders = await orderService.deliveredOrder(orderId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelledOrder = async (req, res) => {
  const { orderId } = req.params.orderId;
  try {
    const orders = await orderService.cancelledOrder(orderId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params.orderId;
  try {
    await orderService.deleteOrder(orderId);
    res.status(204).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrder,
  shippedOrder,
  deliveredOrder,
  cancelledOrder,
  deleteOrder,
};
