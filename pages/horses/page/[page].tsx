import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { getGlobalElements } from "lib/get-global-elements";
import { Layout, LayoutProps } from "components/layout";
import { Pager, PagerProps } from "components/pager";
import { getCustomDrupalView } from "lib/utils";
// import { PageHeader } from "components/page-header";
import { Node } from "components/node";
// GET THE META SEO GOING
// import { Meta } from "components/meta"

// Need to move to global.
export const NUMBER_OF_POSTS_PER_PAGE = 6;

export interface HorsesPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  nodes: any;
}

export default function HorsesPagePage({
  menus,
  blocks,
  page,
  nodes,
}: HorsesPageProps) {
  // If there is only one page of nodes.
  const pageCount = page.total > 1 ? true : false;

  return (
    <Layout meta={{ title: "Our Horses" }} menus={menus} blocks={blocks}>
      {/* <PageHeader
        heading="Our Horses"
        breadcrumbs={[
          {
            title: "Our Horses",
          },
        ]}
      /> */}

      <div className="lg:h-60 lg:px-5">
        <div className="p-20 outline outline-1 outline-orange-100 lg:h-60">
          <p className="text-white">Slider here soon</p>
        </div>
      </div>
      <div className="p-5 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:pl-5 lg:text-left lg:text-5xl">
            Our Horses
          </h1>

          {nodes.results.length ? (
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:content-stretch sm:justify-center">
              {nodes.results.map((horsesNode) => (
                <Node viewMode="teaser" key={horsesNode.id} node={horsesNode} />
              ))}
            </div>
          ) : (
            <p className="py-6 text-4xl text-white">No Horses found.</p>
          )}
          {pageCount ? (
            <Pager
              current={page.current}
              total={page.total}
              href={(page) => (page === 0 ? `/horses` : `/horses/page/${page}`)}
              className="mt-8 flex justify-center py-8"
            />
          ) : (
            <div className="mt-8"></div>
          )}
        </div>
        <aside className="hidden lg:col-span-3 lg:block">
          <h2 className="text-white">Sidebar on larger</h2>
          <p className="text-white">Going to add the Sidebar fun soon</p>
        </aside>
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
): Promise<GetStaticPropsResult<HorsesPageProps>> {
  // For the main page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_livestock_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("livestock--page_horses", {
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
