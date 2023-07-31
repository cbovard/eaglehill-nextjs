import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { getGlobalElements } from "lib/get-global-elements";
import { Layout, LayoutProps } from "components/layout";
import { Pager, PagerProps } from "components/pager";
import { getCustomDrupalView } from "lib/utils";
import { PageHeader } from "components/page-header";
import { Node } from "components/node";
// GET THE META SEO GOING
// import { Meta } from "components/meta"

export const NUMBER_OF_POSTS_PER_PAGE = 10;

export interface StallionsPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  nodes: any;
}

export default function StallionsPage({
  menus,
  blocks,
  page,
  nodes,
}: StallionsPageProps) {
  // If there is only one page of nodes
  let pageCount = false;
  if (page.total > 1) {
    pageCount = true;
  }

  return (
    <Layout meta={{ title: "Stallions" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading="Stallions"
        breadcrumbs={[
          {
            title: "Stallions",
          },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-6 pt-10 md:py-20">
        {nodes.results.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.results.map((stallionsNode) => (
              <Node
                viewMode="teaser"
                key={stallionsNode.id}
                node={stallionsNode}
              />
            ))}
          </div>
        ) : (
          <p className="py-6">No posts found</p>
        )}
        {pageCount ? (
          <Pager
            current={page.current}
            total={page.total}
            href={(page) =>
              page === 0 ? `/stallions` : `/stallions/page/${page}`
            }
            className="mt-8 py-8"
          />
        ) : null}
      </div>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // Use SSG for the first pages, then fallback to SSR for other pages.
  const paths = Array(5)
    .fill(0)
    .map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<StallionsPageProps>> {
  // For the main stallions page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_livestock_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("livestock--page_stallions", {
    params: params,
    current: current,
  });

  return {
    props: {
      ...(await getGlobalElements(context)),
      nodes,
      page: {
        current,
        total: Math.ceil(nodes.meta.count / NUMBER_OF_POSTS_PER_PAGE),
      },
    },
  };
}
