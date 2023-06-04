import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { Breadcrumbs } from "components/breadcrumbs"
import { FormattedText } from "./formatted-text"
import { absoluteURL } from "lib/utils"
import { MediaImages } from "components/media--images"

interface NodePageProps {
  node: DrupalNode
}

export function NodePage({ node }: NodePageProps) {

  const isFront = (node.id == '482e1cc3-d016-47d8-a164-53d7fb0b6b7e') ? 'isFront' : 'notFront';

  return (
    <div className="container">
      {isFront == "notFront" && (
        <Breadcrumbs
          items={[
            {
              title: node.title,
            },
          ]}
        />
      )}
      <article className="bg-white border text-text p-9 border-border">
        <h1 className="font-serif text-2xl leading-tight lg:text-4xl">
          {node.title}
        </h1>
        <div className="mt-4 prose prose-a:text-link max-w-none text-text">
          {node.body?.processed && <FormattedText text={node.body.processed} />}
        </div>
        {node.field_page_images?.length ? (
          <div>
            <MediaImages media={node.field_page_images} teaser={false} />
          </div>
        ) : null}
      </article>
    </div>
  )
}
