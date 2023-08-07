import { DrupalMedia } from "next-drupal";
import { MediaImages } from "components/media--images";

const mediaTypes = {
  "media--image": MediaImages,
};

export interface MediaProps {
  media: DrupalMedia;
  teaser: boolean;
}

export function Media({ media, teaser, ...props }: MediaProps) {
  const Component = mediaTypes[media?.type];

  if (!media || !Component) {
    return null;
  }

  return <Component media={media} {...props} />;
}
