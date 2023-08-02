import Link from "next/link";
import Image from "next/image";

import { NodeProps } from "components/node";
import { MediaImages } from "components/media--images";
import { absoluteURL } from "lib/utils";
import { FormattedText, TeaserText } from "./formatted-text";

export function NodeNews({ node, viewMode, ...props }: NodeProps) {
  if (viewMode === "teaser") {
    return <NodeNewsTeaser node={node} {...props} />;
  }

  if (viewMode === "full") {
    return <NodeNewsFull node={node} {...props} />;
  }

  return null;
}

export function NodeNewsFull({ node, ...props }) {
  return (
    <article
      data-cy="node--news"
      {...props}
      className="text-text border-border border bg-white p-9"
    >
      <h1 className="font-serif text-2xl leading-tight lg:text-4xl">
        {node.title}
      </h1>
      <div className="prose-a:text-link text-text prose mt-4 max-w-none">
        {node.body?.processed && <FormattedText text={node.body.processed} />}
      </div>
      {node.field_news_images?.length ? (
        <div>
          <MediaImages media={node.field_news_images} teaser={false} />
        </div>
      ) : null}
    </article>
  );
}

export function NodeNewsTeaser({ node, ...props }) {
  return (
    <article
      data-cy="node--news"
      {...props}
      className="m-auto max-w-xs rounded-lg bg-deep-fir-950 p-4 text-center drop-shadow-white-1 sm:relative sm:m-0 sm:flex
      sm:max-w-none sm:flex-row sm:gap-2 sm:text-left"
    >
      {node.field_news_images[0].field_media_image?.uri && (
        <div className="mb-4 w-80 sm:mb-0">
          <Link href={node.path.alias} passHref>
            <Image
              src={
                node.field_news_images[0].field_media_image.image_style_uri
                  .image_164x111
              }
              alt={
                node.field_news_images[0].field_media_image.resourceIdObjMeta
                  .alt || "Eagle Hill Equine"
              }
              width={164}
              height={111}
              className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70"
            />
          </Link>
        </div>
      )}
      <div>
        <h2 className="mb-1 font-bebas-neue text-2xl text-deep-fir-100">
          <Link
            href={node.path.alias}
            className="transition-all duration-200 hover:underline"
            passHref
          >
            {node.title}
          </Link>
        </h2>
        {node.body.processed && (
          <section>
            <p className="mb-5 text-sm text-white">
              {node.body?.processed && (
                <TeaserText text={node.body.processed} />
              )}
            </p>
          </section>
        )}
      </div>
      <Link
        href={node.path.alias}
        className="absolute bottom-0 right-0 inline-block rounded-md bg-gradient-to-b from-deep-fir-700 to-deep-fir-800
        p-2 text-xs text-white transition-all
        duration-200 hover:from-deep-fir-800 hover:to-deep-fir-700"
        passHref
      >
        read more +
      </Link>
    </article>
  );
}
