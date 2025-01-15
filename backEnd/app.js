require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const db = require("./config/db");
db();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

cron.schedule("*/5 * * * *", () => {
  exec("curl https://quickbazaar-acyq.onrender.com");
  console.log("Corn running....");
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const adminOrderRoute = require("./routes/admin.routes");
const productRoute = require("./routes/product.routes");
const adminProductRoute = require("./routes/adminProduct.routes");
const cartRouter = require("./routes/cart.routes");
const cartItemRouter = require("./routes/cartItem.routes");
const orderRouter = require("./routes/order.routes");
const reviewRouter = require("./routes/review.routes");
const ratingRouter = require("./routes/rating.routes");
const paymentRouter = require("./routes/payment.routes");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin/orders", adminOrderRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/admin/product", adminProductRoute);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/cartItems", cartItemRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/payments", paymentRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
