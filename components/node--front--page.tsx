import { DrupalNode } from "next-drupal";
import { FormattedText } from "./formatted-text";
import { MediaImages } from "components/media--images";

interface NodeFrontPageProps {
  node: DrupalNode;
}

export function NodeFrontPage({ node }: NodeFrontPageProps) {
  return (
    <article className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4 lg:pt-6">
      <header>
        <h2 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 shadow-black text-shadow md:text-5xl lg:mb-5 lg:text-left xl:mb-6">
          {node.title}
        </h2>
      </header>
      <section
        className="mb-7 text-white prose-headings:font-bebas-neue prose-headings:tracking-wide prose-headings:text-deep-fir-100
        prose-p:mb-2 prose-p:text-base prose-a:text-deep-fir-400
        prose-a:underline prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4"
      >
        {node.body?.processed && <FormattedText text={node.body.processed} />}
      </section>
      {node.field_page_images?.length ? (
        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <MediaImages media={node.field_page_images} teaser={false} />
        </section>
      ) : null}
    </article>
  );
}
