import { DrupalNode } from "next-drupal"
import { FormattedText } from "./formatted-text"
import { MediaImages } from "components/media--images"

interface NodeFrontPageProps {
  node: DrupalNode
}

export function NodeFrontPage({ node }: NodeFrontPageProps) {
  return (
    <article className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
      <header>
        <h1 className="font-bebas-neue text-3xl tracking-wide text-deep-fir-100 md:text-4xl mb-2">
          {node.title}
        </h1>
      </header>
      <section className="mb-7 text-white prose-headings:font-bebas-neue prose-headings:text-deep-fir-100 prose-headings:tracking-wide
        prose-p:text-base prose-p:mb-2 prose-a:text-deep-fir-400
        prose-a:transition-all prose-a:underline prose-a:underline-offset-2 hover:prose-a:underline-offset-4">
        {node.body?.processed && <FormattedText text={node.body.processed} />}
      </section>
      {node.field_page_images?.length ? (
        <section className="grid grid-cols-2 gap-4 mg:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-8">
          <MediaImages media={node.field_page_images} teaser={false} />
        </section>
      ) : null}
    </article>
  )
}