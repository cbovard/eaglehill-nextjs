import { DrupalNode } from "next-drupal";
import { FormattedText } from "./formatted-text";
import { FormEmployment } from "components/form--employment";

interface NodeEmploymentPageProps {
  node: DrupalNode;
}

export function NodeEmploymentPage({ node }: NodeEmploymentPageProps) {
  return (
    <article className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
      <header>
        <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 lg:mb-5 lg:text-left lg:text-5xl">
          {node.title}
        </h1>
      </header>
      <section
        className="mb-8 text-white prose-h2:mb-2 prose-h2:text-xl prose-p:mb-2
        prose-p:text-base prose-a:text-deep-fir-400 prose-a:underline
        prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4 prose-h2:lg:text-2xl"
      >
        {node.body?.processed && <FormattedText text={node.body.processed} />}
      </section>
      <section>
        <FormEmployment />
      </section>
    </article>
  );
}
