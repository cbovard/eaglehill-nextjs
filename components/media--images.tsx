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

  //console.log(teaser);

  // If there are no images.
  if (!images[0].field_media_image?.uri) {
    return null
  }

  // todo - need to move below to a component and get image styles.
  // If there is only one teaser image
  if (teaser) {
    return (
      <div>
        <div className="media__content image__wrapper" {...props}>
          <Image
            src={absoluteURL(images[0].field_media_image.uri.url)}
            alt={images[0].field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
            width={500}
            height={500}
          />
        </div>
      </div>
    )
  } else {
    // Get all the images.
    return (
      <div>
      {images.map((image) => (
        <div key={image.id} className="media__content image__wrapper" {...props}>
          <Image
            src={absoluteURL(image.field_media_image.uri.url)}
            alt={image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
            width={500}
            height={500}
          />
        </div>
      ))}
      </div>
    )
  }
}
