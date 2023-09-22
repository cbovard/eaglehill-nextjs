// https://nextjs.org/docs/pages/building-your-application/optimizing/images
// https://nextjs.org/docs/pages/api-reference/components/image
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { MediaProps } from "components/media";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImages({ media, teaser, ...props }: MediaImageProps) {
  const images = media;

  // If there are no images.
  if (!images[0].field_media_image?.uri) {
    return null;
  }

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  // Get all the images.
  //console.log(images);

  return (
    <LightGallery
      onInit={onInit}
      speed={500}
      plugins={[lgThumbnail]}
      elementClassNames="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {images.map((image, index) => (
        <div key={index} className="media__content image__wrapper" {...props}>
          <Link
            href={image.field_media_image.image_style_uri.image_800x600_webp}
            data-src={
              image.field_media_image.image_style_uri.image_800x600_webp
            }
            passHref
          >
            <Image
              src={image.field_media_image.image_style_uri.image_800x600_webp}
              alt={
                image.field_media_image.resourceIdObjMeta.alt ||
                "Eagle Hill Equine"
              }
              width={800}
              height={600}
              sizes="(max-width: 768px) 25vw, (max-width: 1024px) 33vw, 25vw"
              quality={70}
              placeholder="blur"
              blurDataURL={
                image.field_media_image.image_style_uri.image_800x600_webp
              }
              className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70"
            />
          </Link>
        </div>
      ))}
    </LightGallery>
  );
  //   images.map((image) => (

  // )
  // return images.map((image) => (
  //   <div key={image.id} className="media__content image__wrapper" {...props}>
  //     <Image
  //       src={image.field_media_image.image_style_uri.image_800x600_webp}
  //       alt={
  //         image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"
  //       }
  //       width={800}
  //       height={600}
  //       sizes="(max-width: 768px) 25vw, (max-width: 1024px) 33vw, 25vw"
  //       quality={70}
  //       placeholder="blur"
  //       blurDataURL={image.field_media_image.image_style_uri.image_800x600_webp}
  //       className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70"
  //     />
  //   </div>
  // ));
}
