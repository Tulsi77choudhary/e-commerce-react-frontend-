import AliceCarousel from "react-alice-carousel";
import { Button } from "@mui/material";
import HomeSectionCard from "./HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; // Right icon add kiya
import { useState, useEffect, useRef } from "react";

const HomeSectionCarousel = ({ data = [], sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 720) setVisibleItems(responsive[0].items);
      else if (width < 1024) setVisibleItems(responsive[720].items);
      else setVisibleItems(responsive[1024].items);
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const items = (data || []).slice(0, 10).map((item, index) => (
    <HomeSectionCard key={item.id || index} product={item} />
  ));

  const maxIndex = items.length - visibleItems;

  const slidePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const slideNext = () => {
    const newIndex = Math.min(activeIndex + 1, maxIndex);
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const syncActiveIndex = (event) => setActiveIndex(event.item);

  return (
    <div className="px-4 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          disableDotsControls
          infinite={false}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          ref={carouselRef}
        />

        {/* Next Button (Horizontal) */}
        {activeIndex < maxIndex && (
          <Button
            variant="contained"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0rem",
              transform: "translateY(-50%) translateX(50%)", // Button ko center horizontal kiya
              bgcolor: "white",
              color: "black",
              minWidth: "0",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <KeyboardArrowRightIcon /> 
          </Button>
        )}

        {/* Prev Button (Horizontal) */}
        {activeIndex > 0 && (
          <Button
            variant="contained"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0rem",
              transform: "translateY(-50%) translateX(-50%)", // Left side horizontal positioning
              bgcolor: "white",
              color: "black",
              minWidth: "0",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;