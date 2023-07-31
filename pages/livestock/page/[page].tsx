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

export interface LivestockPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">;
  nodes: any;
}

export default function LivestockPagePage({
  menus,
  blocks,
  page,
  nodes,
}: LivestockPageProps) {
  // If there is only one page of nodes.
  const pageCount = page.total > 1 ? true : false;

  return (
    <Layout meta={{ title: "Our Livestock" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading="Our Livestock"
        breadcrumbs={[
          {
            title: "Our Livestock",
          },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-6 pt-10 md:py-20">
        <div>
          <p>
            Welcome to our livestock page, we first feature our stallions and
            then our mares, donkeys, and mules. Look around and pick out your
            next champion, partner, and friend.
          </p>
          <p>
            We believe an important part of the foundation, of a good breeding
            program, is its Mares. With that in mind, we choose ours for
            conformation, attitude, pedigree, and suitability for our chosen
            focus. Our small standard donkeys are wonderful pets with abundance
            of personality, always an enjoyable part of our farm.
          </p>
          <p>
            SIRTAINLY SIERRA, a 2005 Bay Stallion with Multiple Grands/Reserves
            & Circuit Championships • Open and Amateur ROMs, Multiple World Show
            Qualifier • 5 Canadian National Championship Titles • Canadian
            National Supreme Stallion,2007. We have had a great year showing and
            Sirtainly Sierra has earned AQHA SUPERIOR HALTER HORSE!!!!!!!!!!!!!
          </p>
          <p>
            TRIPLE X FELLA, 2005 Palomino Overo Stallion, HYPP N/N, OLWS Neg, 34
            Halter Points PtHAAQHA#4885339, APHA#834,913, PHBA#86244, and
            PtHA#127080Sire: Mr Yella Fella-Two Time AQHA World Champion,Two
            Time PHBA World Champion, AQHA Superior Halter Horse with 173.5
            Points, Congress Champion Amateur Aged Stallion,Res. Champion Open
            Aged StallionDam: PromiseMeaScotchman-155 APHA Halter Points, APHA
            World Top 5Triple X Fella is the sire of Multiple Futurity Winners,
            watch for his foals in the Show Pen! Consider the possibilities with
            your mares.
          </p>
          <p>
            Junior Stallion HCF Lawless, APHA Black and White Tovero, currently
            in training, Limited stud book. Amazing movement and size. Watch for
            this exciting stallion at the shows
          </p>
          <p>
            AQHA Halter: Evaluates conformation of the American Quarter Horse as
            a breed. Halter classes are divided by age and sex. Horses are shown
            with a leather halter and are traveled before the judges so that
            lameness and quality of movement can be evaluated. Horses are judged
            on balance, structural correctness, breed and sex characteristics
            and degree of muscling. Of these, balance is the most important..
          </p>
          <p>CONTACT PHONE NUMBER Cell 403-996-3105 Farm 403-556-1195</p>
        </div>
        {nodes.results.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.results.map((livestockNode) => (
              <Node
                viewMode="teaser"
                key={livestockNode.id}
                node={livestockNode}
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
              page === 0 ? `/livestock` : `/livestock/page/${page}`
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
): Promise<GetStaticPropsResult<LivestockPageProps>> {
  // For the main page this will be 0.
  const current = parseInt(context.params.page);

  let params = "?include=field_livestock_images.field_media_image";
  // If this is not 1st page.
  if (current != 0) {
    params = params + `&page=${current}`;
  }

  const nodes = await getCustomDrupalView("livestock--page_livestock", {
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
