// https://nextjs.org/docs/pages/building-your-application/optimizing/images
import Image, { ImageProps } from "next/image"

import { absoluteURL } from "lib/utils"
import { MediaProps } from "components/media"

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImages({
  media,
  layout = "responsive",
  objectFit,
  width,
  height,
  priority,
  ...props
}: MediaImageProps) {
  const images = media;

  console.log(images[0].field_media_image.uri);

  // If there are no images.
  if (!images[0].field_media_image?.uri) {
    return null
  }

  console.log(images);

  const sizeProps =
    layout === "fill"
      ? null
      : {
          width: width,
          height: height,
        }

  return (
    <div>
    {images.map((image) => (
      <div key={image.id} className="media__content image__wrapper" {...props}>
        <Image
          src={absoluteURL(image.field_media_image.uri.url)}
          layout={layout}
          objectFit={objectFit}
          alt={image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
          title={image.resourceIdObjMeta.title}
          priority={priority}
          {...sizeProps}
        />
      </div>
    ))}
    </div>
  )
}
