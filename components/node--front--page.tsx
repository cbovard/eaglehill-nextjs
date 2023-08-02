import { DrupalNode } from "next-drupal";
import { FormattedText } from "./formatted-text";
import { MediaImages } from "components/media--images";

interface NodeFrontPageProps {
  node: DrupalNode;
}

export function NodeFrontPage({ node }: NodeFrontPageProps) {
  return (
    <article className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
      <header>
        <h1 className="mb-2 font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl">
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
      {node.field_page_images?.length ? (
        <section className="flex flex-row flex-wrap justify-center gap-2">
          <MediaImages media={node.field_page_images} teaser={false} />
        </section>
      ) : null}
    </article>
  );
}
