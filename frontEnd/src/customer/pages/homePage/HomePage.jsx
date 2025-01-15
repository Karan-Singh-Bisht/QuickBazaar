import React from "react";
import Maincarousel from "../../components/homeCarousel/Maincarousel";
import HomeSectionCarousel from "../../components/homeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens_kurta";
import { mens_jeans } from "../../../Data/mens_jeans";
import { woman_top } from "../../../Data/woman_top";
import { woman_dress } from "../../../Data/woman_dress";

const HomePage = () => {
  return (
    <div>
      <Maincarousel />
      <div className="py-20 space-y-10 flex flex-col">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"} />
        <HomeSectionCarousel data={woman_top} sectionName={"Women's Top"} />
        <HomeSectionCarousel data={mens_jeans} sectionName={"Men's Jeans"} />
        <HomeSectionCarousel data={woman_dress} sectionName={"Women's Dress"} />
      </div>
    </div>
  );
};

export default HomePage;
