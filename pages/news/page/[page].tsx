import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import { DrupalNode, JsonApiResponse } from "next-drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getGlobalElements } from "lib/get-global-elements"
import { drupal } from "lib/drupal"
import { Layout, LayoutProps } from "components/layout"
import { Pager, PagerProps } from "components/pager"
// import { Node } from "components/node"
// import { Meta } from "components/meta"

export const NUMBER_OF_POSTS_PER_PAGE = 10

export interface NewsPageProps extends LayoutProps {
  page: Pick<PagerProps, "current" | "total">
  nodes: DrupalNode[]
}

export default function NewsPage({ nodes, menus, page, blocks }: NewsPageProps) {
  const { locale } = useRouter()
  const title = locale === "en" ? "Latest Articles." : "Últimas Publicaciones."

  return (
    <Layout menus={menus} blocks={blocks}>
      <div className="container max-w-6xl px-6 pt-10 mx-auto md:py-20">
        <h1 className="mb-10 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {nodes.length ? (
          <div className="grid gap-20 md:grid-cols-2">
            {/* {nodes.map((article) => (
              <Node viewMode="teaser" key={article.id} node={article} />
            ))} */}
          </div>
        ) : (
          <p className="py-6">No posts found</p>
        )}
        {page ? (
          <Pager
            current={page.current}
            total={page.total}
            href={(page) => (page === 0 ? `/news` : `/news/page/${page}`)}
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
): Promise<GetStaticPropsResult<NewsPageProps>> {
  const current = parseInt(context.params.page)

  const params = new DrupalJsonApiParams()
    // .addFilter(
    //   "field_site.meta.drupal_internal__target_id",
    //   process.env.DRUPAL_SITE_ID
    // )
    .addFields("node--news", [
      "title",
      "path",
      "body",
      "uid",
      "created",
    ])
    .addFilter("status", "1")
    .addSort("created", "DESC")

  const result = await drupal.getResourceCollectionFromContext<JsonApiResponse>(
    "node--news",
    context,
    {
      deserialize: false,
      params: {
        ...params.getQueryObject(),
        page: {
          limit: NUMBER_OF_POSTS_PER_PAGE,
          offset: context.params.page ? NUMBER_OF_POSTS_PER_PAGE * current : 0,
        },
      },
    }
  )

  if (!result.data?.length) {
    return {
      notFound: true,
    }
  }

  // empty
  //console.log(result.meta.count);


  const nodes = drupal.deserialize(result) as DrupalNode[]

  // const nodes = result

  return {
    props: {
      ...(await getGlobalElements(context)),
      nodes,
      page: {
        current,
        total: Math.ceil(20 / NUMBER_OF_POSTS_PER_PAGE),
      },
    },
  }
}
