import React, { useState } from 'react';

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
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === currentIndex ? 10 : 1 }}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-gray-900' : 'bg-gray-400'
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
