import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ProductCard from "../homeSectionCard/ProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const HomeSectionCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Create a ref for AliceCarousel
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  // Sync active index with AliceCarousel's internal state
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // Slide previous and next using carousel's internal methods
  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  // Map products to carousel items
  const items = data.map((product, index) => (
    <ProductCard key={index} product={product} />
  ));

  return (
    <div className="relative px-4 lg:px-8 ">
      <div className="relative p-5 ml-4 border">
        {/* Prev button */}
        {activeIndex > 0 && (
          <button
            onClick={slidePrev}
            aria-label="prev"
            className="z-50 hover:bg-blue-400 bg-white shadow-lg rounded-md h-16 w-[2.5vw] absolute top-[10vw] left-[-1.2vw]"
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
            className="z-50 hover:bg-blue-400 shadow-lg bg-white rounded-md h-16 w-[2.5vw] absolute top-[10vw] right-[-1vw]"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
