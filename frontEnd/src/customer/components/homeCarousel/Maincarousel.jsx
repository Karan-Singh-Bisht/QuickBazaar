import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./MainCarouselData";
import { useNavigate } from "react";

const Maincarousel = () => {
  //   const navigate = useNavigate;

  const items = homeCarouselData.map((item) => (
    <img
      role="presentation"
      className="cursor-pointer"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt="image"
    />
  ));
  return (
    <AliceCarousel
      autoPlay
      autoPlayStrategy="none"
      autoPlayInterval={1000}
      animationDuration={1000}
      infinite
      touchTracking={false}
      disableButtonsControls
      items={items}
    />
  );
};

export default Maincarousel;
