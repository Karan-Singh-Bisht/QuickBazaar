import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ProductCard from "../homeSectionCard/ProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Create a ref for AliceCarousel
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 }, // 1 item for extra-small screens
    640: { items: 2 }, // 2 items for small screens
    1024: { items: 4 }, // 4 items for medium screens
    1280: { items: 5 }, // 5 items for large screens
  };

  // Sync active index with AliceCarousel's internal state
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // Slide previous and next using carousel's internal methods
  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const items = data.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  return (
    <div className="relative px-4 lg:px-8 mt-10">
      <h1 className="font-semibold text-xl lg:text-2xl px-5 pb-2">
        {sectionName}
      </h1>
      <div className="relative p-4 border rounded-lg">
        {/* Prev button */}
        {activeIndex > 0 && (
          <button
            onClick={slidePrev}
            aria-label="prev"
            className="sm:flex items-center justify-center z-50 hover:bg-blue-400 bg-white shadow-lg rounded-md h-10 w-10 md:h-14 md:w-14 absolute top-1/2 left-[-1rem] transform -translate-y-1/2"
          >
            <ChevronLeftIcon />
          </button>
        )}
        {/* Alice Carousel */}
        <AliceCarousel
          ref={carouselRef} // Add ref to the carousel
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          items={items}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />

        {/* Next button */}
        {activeIndex < items.length - 1 && (
          <button
            onClick={slideNext}
            aria-label="next"
            className="sm:flex items-center justify-center z-50 hover:bg-blue-400 bg-white shadow-lg rounded-md h-10 w-10 md:h-14 md:w-14 absolute top-1/2 right-[-1rem] transform -translate-y-1/2"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
