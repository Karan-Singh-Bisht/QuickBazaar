import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/pages/homePage/HomePage";
import Cart from "../customer/components/cart/Cart";
import Navigation from "../customer/components/navigation/Navigation";
import Footer from "../customer/components/footer/Footer";
import Product from "../customer/components/product/Product";
import ProductDetails from "../customer/components/productDetails/ProductDetails";
import Checkout from "../customer/components/checkout/Checkout";
import Order from "../customer/components/order/Order";
import OrderDetails from "../customer/components/order/OrderDetails";
import Payment from "../customer/components/payment/Payment";

const CustomerRoutes = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/:lavelOne/:lavelTwo/:lavelThree"
          element={<Product />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order" element={<Order />}></Route> //see all your
        orders
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>{" "}
        <Route path="/payment/:orderId" element={<Payment />}></Route>
        //See a particular order
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoutes;
