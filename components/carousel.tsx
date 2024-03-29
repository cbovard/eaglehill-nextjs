import React, { useState } from "react";
import Image from "next/image";
import { DrupalView } from "next-drupal";

interface CarouselProps {
  images: DrupalView;
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-52 px-5 sm:h-80 lg:h-[25rem]">
      <div className="relative h-full">
        <div className="relative z-0 flex h-full items-center justify-center">
          {images.results.map((image, index) => (
            <Image
              key={index}
              src={
                image.field_slideshow_image.field_media_image.image_style_uri
                  .image_1240x400_webp
              }
              alt={
                image.field_slideshow_image.field_media_image.resourceIdObjMeta
                  .alt || "Eagle Hill Equine"
              }
              width={1240}
              height={400}
              priority={index === 0} // Set to true for the first iteration, false for the rest
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={
                image.field_slideshow_image.field_media_image.image_style_uri
                  .image_1240x400_webp
              }
              className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: index === currentIndex ? 10 : 1 }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 mb-2.5 flex justify-center">
          {images.results.map((_, index) => (
            <div
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`mx-1 h-2 w-2 cursor-pointer rounded-full ${
                index === currentIndex ? "bg-gray-400" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
