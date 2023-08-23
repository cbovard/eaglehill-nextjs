import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-full">
      <div className="relative z-0 flex h-full items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute left-0 top-0 h-full w-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: index === currentIndex ? 10 : 1 }}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 mt-2 flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${
              index === currentIndex ? "bg-gray-900" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
        <button
          onClick={handlePrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;
