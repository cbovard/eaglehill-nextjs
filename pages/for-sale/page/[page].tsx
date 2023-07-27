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

export interface ForSalePageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">
  nodes: any
}

export default function ForSalePagePage({
  menus,
  blocks,
  page,
  nodes,
}: ForSalePageProps) {

  // If there is only one page of nodes.
  const pageCount = (page.total > 1) ? true : false;

  return (
    <Layout meta={{ title: "Livestock For Sale" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading="Livestock For Sale"
        breadcrumbs={[
          {
            title: "Livestock For Sale",
          },
        ]}
      />
      <div className="container max-w-6xl px-6 pt-10 mx-auto md:py-20">
        <div>
          <p>Here we hope you find the animal of your dreams. For Horses or Donkeys we have a colorful selection. Please contact us if you would like more information. Click on the picture to see pedigrees, descriptions and larger pictures. All prices are in Canadian dollars. Thank you to all who have purchased our animals. We know they have great homes and you will enjoy them as we did while they lived here!</p>
        </div>
        {nodes.results.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.results.map((forSaleNode) => (
              <Node viewMode="teaser" key={forSaleNode.id} node={forSaleNode} />
            ))}
          </div>
        ) : (
          <p className="py-6">No posts found</p>
        )}
        {pageCount ? (
          <Pager
            current={page.current}
            total={page.total}
            href={(page) => (page === 0 ? `/for-sale` : `/for-sale/page/${page}`)}
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
): Promise<GetStaticPropsResult<ForSalePageProps>> {

  // For the main page this will be 0.
  const current = parseInt(context.params.page)

  let params = '?include=field_livestock_images.field_media_image'
  // If this is not 1st page.
  if (current != 0){
    params = params + `&page=${current}`
  }

  const nodes = await getCustomDrupalView("livestock--page_for_sale", {
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