import { NodeProps } from "components/node"
import { MediaImages } from "components/media--images"
import { FormattedText } from "./formatted-text"

export function NodePage({ node, ...props }: NodeProps) {
  delete props.viewMode

  return (
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
  )
}
