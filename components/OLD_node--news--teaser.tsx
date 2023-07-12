import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { MediaImages } from "components/media--images"
import { TeaserText } from "./formatted-text"

interface NodeNewsTeaserProps {
  node: DrupalNode
}

export function NodeNewsTeaser({ node, ...props }: NodeNewsTeaserProps) {

  //console.log(node, 'Teaser')

  return (
    <article
      className="relative flex flex-col p-4 space-y-4 overflow-hidden bg-white border border-border group"
      {...props}
    >
      {/* <MediaImages media={node.field_news_images} width={335} height={225} teaser={true}/> */}
      <h2 className="flex-1 font-serif text-2xl">
        <Link href={node.attributes.path.alias}
          className="inline-flex items-center uppercase hover:underline text-link"
          passHref>
          {node.attributes.title}
        </Link>
      </h2>
      {node.attributes.body.processed && (
        <section>
          <p className="text-black">{node.attributes.body?.processed && <TeaserText text={node.attributes.body.processed} />}</p>
        </section>
      )}
      <Link href={node.attributes.path.alias}
        className="hover:underline text-black text-link"
        passHref>
        read more +
      </Link>
    </article>
  )
}
