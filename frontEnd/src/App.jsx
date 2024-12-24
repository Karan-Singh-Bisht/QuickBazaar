import React from "react";
import HomePage from "./customer/pages/homePage/HomePage";
import Navigation from "./customer/components/navigation/Navigation";
import Footer from "./customer/components/footer/Footer";
import Product from "./customer/components/product/Product";
import ProductDetails from "./customer/components/productDetails/ProductDetails";

const App = () => {
  return (
    <div className="">
      <Navigation />
      <HomePage />
      <Product />
      <ProductDetails />
      <Footer />
    </div>
  );
};

export default App;
