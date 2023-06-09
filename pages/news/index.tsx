import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeNewsTeaser} from "components/node--news--teaser"
import { PageHeader } from "components/page-header"

interface NewsPageProps extends LayoutProps {
  news: DrupalNode[]
}

export default function NewsPage({
  news,
  menus,
}: NewsPageProps) {

  // console.log(news)

  return (
    <Layout
      menus={menus}
      meta={{
        title: "News",
      }}
    >
      <PageHeader
        heading={"News"}
        breadcrumbs={[
          {
            title: "News",
          },
        ]}
      />
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((news_node) => (
            <NodeNewsTeaser key={news_node.id} node={news_node} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NewsPageProps>> {
  // Fetch all published news nodes sorted by date.
  const news = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--news",
    context,
    {
      params: getParams("node--news", "teaser")
        .addSort("created", "DESC")
        .getQueryObject(),
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      news,
    },
  }
}
