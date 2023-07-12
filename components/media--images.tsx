// https://nextjs.org/docs/pages/building-your-application/optimizing/images
// https://nextjs.org/docs/pages/api-reference/components/image
// todo fix this
import Image, { ImageProps } from "next/image"

import { absoluteURL } from "lib/utils"
import { MediaProps } from "components/media"

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImages({
  media,
  teaser,
  ...props
}: MediaImageProps) {
  const images = media;

  // If there are no images.
  if (!images[0].field_media_image?.uri) {
    return null
  }

  // todo get image styles here with a Prop
  // Get all the images.
  return (
    <div>
    {images.map((image) => (
      <div key={image.id} className="media__content image__wrapper" {...props}>
        <Image
          src={absoluteURL(image.field_media_image.image_style_uri.image_164x111)}
          alt={image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
          width={164}
          height={111}
        />
      </div>
    ))}
    </div>
  )
}
