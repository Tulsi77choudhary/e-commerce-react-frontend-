import React from "react";
import { MainCarouselData } from "./MainCarouselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarousel = () => {
  // Banner Carousel ke liye responsive logic ki zarurat tabhi hai agar 1 se zyada items dikhane hon
  // Agar single item hai toh items: 1 default sahi hai

  const items = MainCarouselData.map((item) => (
    <div
      key={item.id || item.image}
      className="cursor-pointer"
      role="presentation" // Accessibility ke liye
    >
      <img
        src={item.image}
        alt={item.title || "Banner"}
        className="w-full object-cover object-top lg:aspect-[16/5] md:aspect-[16/7] aspect-[16/9]" // Responsive aspects
        onDragStart={(e) => e.preventDefault()} // Dragging issue fix karne ke liye
      />
    </div>
  ));

  return (
    <div className="relative z-[-10]"> {/* Navbar dropdown ke niche rakhne ke liye z-index */}
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000} // Banner ke liye 3-4 seconds standard hai
        infinite
        mouseTracking
        disableDotsControls={false} // Dots navigation allow karne ke liye
      />
    </div>
  );
};

export default MainCarousel;