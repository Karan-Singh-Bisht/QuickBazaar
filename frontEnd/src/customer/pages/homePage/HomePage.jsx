import React from "react";
import Maincarousel from "../../components/homeCarousel/Maincarousel";
import HomeSectionCarousel from "../../components/homeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens_kurta";

const HomePage = () => {
  return (
    <div>
      <Maincarousel />
      <div className="py-20 space-y-10 flex flex-col">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shoes"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shirt"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"Woman's Saree"} />
      </div>
    </div>
  );
};

export default HomePage;
