import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { getGlobalElements } from "lib/get-global-elements";
import { Layout, LayoutProps } from "components/layout";
import { Pager, PagerProps } from "components/pager";
import { getCustomDrupalView } from "lib/utils";
// import { PageHeader } from "components/page-header";
import { Node } from "components/node";
// GET THE META SEO GOING
// import { Meta } from "components/meta"

export const NUMBER_OF_POSTS_PER_PAGE = 10;

export interface NewsPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  nodes: any;
}

export default function NewsPage({
  menus,
  blocks,
  page,
  nodes,
}: NewsPageProps) {
  // If there is only one page of nodes.
  const pageCount = page.total > 1 ? true : false;

  return (
    <Layout meta={{ title: "News" }} menus={menus} blocks={blocks}>
      {/* <PageHeader
        heading="News"
        breadcrumbs={[
          {
            title: "News",
          },
        ]}
      /> */}
      <div className="lg:h-60 lg:px-5">
        <div className="outline outline-1 outline-orange-100 lg:h-60"></div>
      </div>
      <div className="p-5">
        <div className="pt-5">
          <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:text-5xl">
            News
          </h1>
          {nodes.results.length ? (
            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:content-stretch md:justify-center">
              {nodes.results.map((newsNode) => (
                <Node viewMode="teaser" key={newsNode.id} node={newsNode} />
              ))}
            </div>
          ) : (
            <p className="py-6">No News Articles found.</p>
          )}
          {pageCount ? (
            <Pager
              current={page.current}
              total={page.total}
              href={(page) => (page === 0 ? `/news` : `/news/page/${page}`)}
              className="mt-8 flex justify-center py-8"
            />
          ) : null}
        </div>
        <aside className="hidden"></aside>
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
): Promise<GetStaticPropsResult<NewsPageProps>> {
  // For the main news page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_news_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("news--page_news_1", {
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
