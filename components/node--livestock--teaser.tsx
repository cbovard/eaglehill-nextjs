import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { TeaserText } from "./formatted-text"
import { MediaImages } from "components/media--images"

interface NodeLivestockTeaserProps {
  node: DrupalNode
}

export function NodeLivestockTeaser({ node, ...props }: NodeLivestockTeaserProps) {
  return (
    <article
      className="relative flex flex-col p-4 space-y-4 overflow-hidden bg-white border border-border group"
      {...props}
    >
      <MediaImages media={node.field_livestock_images} width={335} height={225} teaser={true}/>
      <h2 className="flex-1 font-serif text-2xl">
        <Link href={node.path.alias}
          className="inline-flex items-center uppercase hover:underline text-link"
          passHref>
          {node.title}
        </Link>
      </h2>
      {node.body && (
        <section>
          <p className="text-black"><TeaserText text={node.body.processed} /></p>
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
