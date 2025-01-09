const paymentService = require("../services/payment.service.js");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);
    return res.status(200).json(paymentLink);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updatePaymentInfo = async (req, res) => {
  try {
    await paymentService.updatePaymentInformation(req.query);
    return res.status(200).json({
      message: `Payment Information updated successfully`,
      status: "true",
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInfo,
};
