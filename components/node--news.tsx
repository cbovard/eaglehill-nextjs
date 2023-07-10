import Link from "next/link"
import Image from "next/image"

import { NodeProps } from "components/node"
import { MediaImages } from "components/media--images"
import { absoluteURL } from "lib/utils"
import { FormattedText, TeaserText } from "./formatted-text"


export function NodeNews({ node, viewMode, ...props }: NodeProps) {
  if (viewMode === "teaser") {
    return <NodeNewsTeaser node={node} {...props} />
  }

  if (viewMode === "full") {
    return <NodeNewsFull node={node} {...props} />
  }

  return null
}

export function NodeNewsFull({ node, ...props }) {

  console.log(node)

  return (
    <article className="bg-white border text-text p-9 border-border">
    <h1 className="font-serif text-2xl leading-tight lg:text-4xl">
      {node.title}
    </h1>
    <div className="mt-4 prose prose-a:text-link max-w-none text-text">
      {node.body?.processed && <FormattedText text={node.body.processed} />}
    </div>
    {node.field_news_images?.length ? (
      <div>
        <MediaImages media={node.field_news_images} teaser={false} />
      </div>
    ) : null}
  </article>
  )
}

export function NodeNewsTeaser({ node, ...props }) {
  return (
    <article
      className="relative flex flex-col p-4 space-y-4 overflow-hidden bg-white border border-border group"
      {...props}
    >
      {node.field_news_images[0].field_media_image?.uri && (
        <div>
          <Image
            src={absoluteURL(node.field_news_images[0].field_media_image.uri.url)}
            alt={node.field_news_images[0].field_media_image.resourceIdObjMeta.alt || "Eagle Hill Equine"}
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
      )}
      <h2 className="flex-1 font-serif text-2xl">
        <Link href={node.path.alias}
          className="inline-flex items-center uppercase hover:underline text-link"
          passHref>
          {node.title}
        </Link>
      </h2>
      {node.body.processed && (
        <section>
          <p className="text-black">{node.body?.processed && <TeaserText text={node.body.processed} />}</p>
        </section>
      )}
      <Link href={node.path.alias}
        className="hover:underline text-black text-link"
        passHref>
        read more +
      </Link>
    </article>
  )
}
