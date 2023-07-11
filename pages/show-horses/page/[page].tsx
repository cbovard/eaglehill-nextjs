import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { getGlobalElements } from "lib/get-global-elements"
import { Layout, LayoutProps } from "components/layout"
import { Pager, PagerProps } from "components/pager"
import { getCustomDrupalView } from "lib/utils"
import { PageHeader } from "components/page-header"
import { Node } from "components/node"
// GET THE META SEO GOING
// import { Meta } from "components/meta"

export const NUMBER_OF_POSTS_PER_PAGE = 10

export interface ShowHorsesPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">
  nodes: any
}

export default function ShowHorsesPage({
  menus,
  blocks,
  page,
  nodes,
}: ShowHorsesPageProps) {

  // If there is only one page of nodes
  let pageCount = false
  if (page.total > 1) {
    pageCount = true
  }

  return (
    <Layout meta={{ title: "Show Horses" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading="Show Horses"
        breadcrumbs={[
          {
            title: "Show Horses",
          },
        ]}
      />
      <div className="container max-w-6xl px-6 pt-10 mx-auto md:py-20">
      <div>
          <p>Full service Equestrian Center offering professional and expert equine training, coaching, sales and breeding from beginner and recreational to World Class Levels!</p>
          <p>EAGLE HILL EQUINE IS NOW OFFERING WORLD CLASS HALTER FITTING.AQHA/APHA Halter: Evaluates conformation of the American Quarter Horse/American Paint Horse as a breed. Halter classes are divided by age and sex. Horses are shown with a leather halter and are traveled before the judges so that lameness and quality of movement can be evaluated. Horses are judged on balance, structural correctness, breed and sex characteristics and degree of muscling. Of these, balance is the most important.Eagle Hill Equine and LaPlaine Quarter Horses and Paints have combined their expertise! Now offer a limited number of Halter fitting openings for the 2020 Show Season. Contact us for pricing and availably. eaglehillequine@live.ca 403-556-1195-. Eagle Hill Equine has everything needed to produce your World Champion!</p>
          <p>We welcome resident trainers Henry and Nicole Gauthier (APHA Professional Horseman) and Assistant Trainer Leah Currie.  With over 25 years of experience LaPlaine QH & Paints offers expert training, sales, coaching and breeding from beginner/recreational to World Show levels.  Also your local Excel Supplements dealer, contact Nicole for more information 306-467-7410</p>
          <p>THOUGHT: Many have the desire to win.............few the will to prepare.</p>
        </div>
        {nodes.results.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.results.map((showHorsesNode) => (
              <Node viewMode="teaser" key={showHorsesNode.id} node={showHorsesNode} />
            ))}
          </div>
        ) : (
          <p className="py-6">No posts found</p>
        )}
        {pageCount ? (
          <Pager
            current={page.current}
            total={page.total}
            href={(page) => (page === 0 ? `/show-horses` : `/show-horses/page/${page}`)}
            className="py-8 mt-8"
          />
        ) : null}
      </div>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // Use SSG for the first pages, then fallback to SSR for other pages.
  const paths = Array(5)
    .fill(0)
    .map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }))

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ShowHorsesPageProps>> {

  // For the main page this will be 0.
  const current = parseInt(context.params.page)

  let params = '?include=field_livestock_images.field_media_image'
  // If this is not 1st page.
  if (current != 0){
    params = params + `&page=${current}`
  }

  const nodes = await getCustomDrupalView("livestock--page_show_horses", {
    params: params,
    current: current,
  })

  return {
    props: {
      ...(await getGlobalElements(context)),
      nodes,
      page: {
        current,
        total: Math.ceil(nodes.meta.count / NUMBER_OF_POSTS_PER_PAGE),
      },
    },
  }
}
