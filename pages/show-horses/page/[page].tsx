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

export interface ShowHorsesPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  slideShowBlock: DrupalView;
  sidebarCtasBlock: DrupalView;
  nodes: any;
}

export default function ShowHorsesPage({
  menus,
  blocks,
  slideShowBlock,
  page,
  sidebarCtasBlock,
  nodes,
}: ShowHorsesPageProps) {
  // If there is only one page of nodes
  let pageCount = false;
  if (page.total > 1) {
    pageCount = true;
  }

  return (
    <Layout meta={{ title: "Show Horses" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      <div className="p-5 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:pl-5 lg:text-left lg:text-5xl">
            Show Horses
          </h1>
          <div className="mb-7 rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
            {/* { todo - this needs to be in a block down the road} */}
            <div
              className="text-white prose-headings:font-bebas-neue prose-headings:tracking-wide prose-headings:text-deep-fir-100
        prose-p:mb-2 prose-p:text-base prose-a:text-deep-fir-400
        prose-a:underline prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4"
            >
              <p>
                Full service Equestrian Center offering professional and expert
                equine training, coaching, sales and breeding from beginner and
                recreational to World Class Levels!
              </p>
              <p>
                EAGLE HILL EQUINE IS NOW OFFERING WORLD CLASS HALTER
                FITTING.AQHA/APHA Halter: Evaluates conformation of the American
                Quarter Horse/American Paint Horse as a breed. Halter classes
                are divided by age and sex. Horses are shown with a leather
                halter and are traveled before the judges so that lameness and
                quality of movement can be evaluated. Horses are judged on
                balance, structural correctness, breed and sex characteristics
                and degree of muscling. Of these, balance is the most
                important.Eagle Hill Equine and LaPlaine Quarter Horses and
                Paints have combined their expertise! Now offer a limited number
                of Halter fitting openings for the 2020 Show Season. Contact us
                for pricing and availably. eaglehillequine@live.ca
                403-556-1195-. Eagle Hill Equine has everything needed to
                produce your World Champion!
              </p>
              <p>
                We welcome resident trainers Henry and Nicole Gauthier (APHA
                Professional Horseman) and Assistant Trainer Leah Currie. With
                over 25 years of experience LaPlaine QH & Paints offers expert
                training, sales, coaching and breeding from
                beginner/recreational to World Show levels. Also your local
                Excel Supplements dealer, contact Nicole for more information
                306-467-7410
              </p>
              <p>
                THOUGHT: Many have the desire to win.............few the will to
                prepare.
              </p>
            </div>
          </div>
          {nodes.results.length ? (
            <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:content-stretch md:justify-center">
              {nodes.results.map((showHorsesNode) => (
                <Node
                  viewMode="teaser"
                  key={showHorsesNode.id}
                  node={showHorsesNode}
                />
              ))}
            </div>
          ) : (
            <p className="py-6 text-4xl text-white">No Show Horses found.</p>
          )}
          {pageCount ? (
            <Pager
              current={page.current}
              total={page.total}
              href={(page) =>
                page === 0 ? `/show-horses` : `/show-horses/page/${page}`
              }
              className="mt-8 flex justify-center py-8"
            />
          ) : (
            <div className="mt-8"></div>
          )}
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
): Promise<GetStaticPropsResult<ShowHorsesPageProps>> {
  // For the main page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_livestock_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("livestock--page_show_horses", {
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
