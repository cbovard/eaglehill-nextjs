import Link from "next/link";
import Image from "next/image";

import { NodeProps } from "components/node";
import { MediaImages } from "components/media--images";
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
      {...props}
      className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4"
    >
      <header>
        <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:text-left lg:text-5xl">
          {node.title}
        </h1>
      </header>
      <section
        className="mb-7 text-white prose-headings:font-bebas-neue prose-headings:tracking-wide prose-headings:text-deep-fir-100
        prose-p:mb-2 prose-p:text-base prose-a:text-deep-fir-400
        prose-a:underline prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4"
      >
        {node.body?.processed && <FormattedText text={node.body.processed} />}
      </section>
      {node.field_news_images?.length ? (
        <section className="flex flex-row flex-wrap justify-center gap-2">
          <MediaImages media={node.field_news_images} teaser={false} />
        </section>
      ) : null}
    </article>
  );
}

export function NodeNewsTeaser({ node, ...props }) {
  return (
    <article
      {...props}
      className="m-auto max-w-xs rounded-lg bg-deep-fir-950 p-4 text-center drop-shadow-white-1 md:m-0 lg:max-w-[18rem]"
    >
      {node.field_news_images[0].field_media_image?.uri && (
        <div className="mb-6">
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
      <h2 className="mb-3 font-bebas-neue text-2xl text-deep-fir-100">
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
          <p className="mb-6 text-base text-white">
            {node.body?.processed && <TeaserText text={node.body.processed} />}
          </p>
        </section>
      )}
      <Link
        href={node.path.alias}
        className="mb-2 inline-block rounded-md bg-gradient-to-b from-deep-fir-700 to-deep-fir-800 p-2
        text-xs font-bold text-white transition-all
        duration-200 hover:from-deep-fir-800 hover:to-deep-fir-700"
        passHref
      >
        read more +
      </Link>
    </article>
  );
}
