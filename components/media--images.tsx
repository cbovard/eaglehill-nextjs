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

  //console.log(images)

  // todo - need to move below to a component and get image styles.
  // The front page does not have the image styles.
  // Need to change it to the [[...slug]].tsx page
  // Get all the images.
  return (
    images.map((image) => (
      <div key={image.id} className="media__content image__wrapper relative overflow-hidden max-h-[5.813rem] max-w-[8.75rem] border border-white" {...props}>
        <Image
          src={absoluteURL(image.field_media_image.uri.url)}
          alt={image.field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
          width={500}
          height={500}
          style={{objectFit:"cover"}}
        />
      </div>
    ))
  )
}
