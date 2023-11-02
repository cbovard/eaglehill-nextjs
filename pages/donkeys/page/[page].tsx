import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { DrupalView } from "next-drupal";
import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { Layout, LayoutProps } from "components/layout";
import { Pager, PagerProps } from "components/pager";
import { getCustomDrupalView } from "lib/utils";
import Carousel from "components/carousel";
import SidebarCtas from "components/sidebar";
import { Node } from "components/node";
// GET THE META SEO GOING
// import { Meta } from "components/meta"

// Need to move to global.
export const NUMBER_OF_POSTS_PER_PAGE = 6;

export interface DonkeysPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  slideShowBlock: DrupalView;
  sidebarCtasBlock: DrupalView;
  nodes: any;
}

export default function DonkeysPagePage({
  menus,
  blocks,
  page,
  slideShowBlock,
  sidebarCtasBlock,
  nodes,
}: DonkeysPageProps) {
  // If there is only one page of nodes.
  const pageCount = page.total > 1 ? true : false;

  return (
    <Layout meta={{ title: "Our Donkeys" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      <div className="p-5 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:pl-5 lg:text-left lg:text-5xl">
            Our Donkeys
          </h1>
          <div className="mb-7 rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
            {/* { todo - this needs to be in a block down the road} */}
            <div
              className="text-white prose-headings:font-bebas-neue prose-headings:tracking-wide prose-headings:text-deep-fir-100
        prose-p:mb-2 prose-p:text-base prose-a:text-deep-fir-400
        prose-a:underline prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4"
            >
              <p>
                Our Small Standard Donkeys are wonderful pets, guard animals, or
                companion animals. Give us a call and we will talk on the
                fantastic personalities of donkeys.
              </p>
            </div>
          </div>
          {nodes.results.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {nodes.results.map((donkeysNode) => (
                <Node
                  viewMode="teaser"
                  key={donkeysNode.id}
                  node={donkeysNode}
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
                page === 0 ? `/donkeys` : `/donkeys/page/${page}`
              }
              className="mt-8 py-8"
            />
          ) : null}
        </div>
        <aside className="hidden pt-5 lg:col-span-3 lg:block">
          <SidebarCtas sidebarCtas={sidebarCtasBlock} />
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
): Promise<GetStaticPropsResult<DonkeysPageProps>> {
  // For the main page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_livestock_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("livestock--page_donkeys", {
    params: params,
    current: current,
  });

  const slideShowBlock = await drupal.getView<DrupalView[]>(
    "slideshows--sub_slideshow_block",
    {
      params: getParams("slideshows--slideshow_block").getQueryObject(),
    },
  );

  const sidebarCtasBlock = await drupal.getView<DrupalView[]>(
    "sidebar_ctas--sidebar_ctas_block",
  );

  return {
    props: {
      ...(await getGlobalElements(context)),
      slideShowBlock,
      sidebarCtasBlock,
      nodes,
      page: {
        current,
        total: Math.ceil(nodes.meta.count / NUMBER_OF_POSTS_PER_PAGE),
      },
    },
  };
}
