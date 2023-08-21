// https://nextjs.org/docs/pages/building-your-application/optimizing/images
// https://nextjs.org/docs/pages/api-reference/components/image
// todo fix this
import Image, { ImageProps } from "next/image";
import { MediaProps } from "components/media";

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImages({ media, teaser, ...props }: MediaImageProps) {
  const images = media;

  // If there are no images.
  if (!images[0].field_media_image?.uri) {
    return null;
  }

  console.log(images);

  // Get all the images.
  return images.map((image) => (
    <div key={image.id} className="media__content image__wrapper" {...props}>
      <Image
        src={image.field_media_image.image_style_uri.image_800x600_webp}
        alt={
          image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"
        }
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80}
        placeholder="blur"
        blurDataURL={image.field_media_image.image_style_uri.image_800x600_webp}
        className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70"
      />
    </div>
  ));
}
