const razorpay = require("../config/razorPayClient");
const orderService = require("../services/order.service");

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);
    const paymentLinkRequest = {
      amount: order.totalDiscountedPrice * 100,
      description: "Payment for order",
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        email: order.user.email,
        contact: order.user.mobile,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:5173/payment/${orderId}`,
      callback_method: "get",
    };
    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    const paymentLinkId = paymentLink.id;
    const paymentLinkUrl = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      paymentLinkUrl,
    };

    return resData;
  } catch (err) {
    throw new Error(`Error creating payment link for order ${orderId}`);
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.paymentId;
  const orderId = reqData.orderId;
  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();
    }
    const resData = { message: "Your order is placed", success: true };
    return resData;
  } catch (err) {
    throw new Error(`Error updating payment information for order ${orderId}`);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
