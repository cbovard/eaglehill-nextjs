import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
import classNames from "classnames"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"

import { Layout, LayoutProps } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"

interface IndexPageProps extends LayoutProps {
  nodes: DrupalNode[]
}

//console.log(GetStaticPropsContext);

export default function IndexPage({
  menus,
  nodes
}: IndexPageProps) {
  return (
    <Layout meta={{ title: "home" }} menus={menus}>
      <div className="container grid gap-8 py-8">
        <h2 className="mb-10 text-6xl font-black">Latest Articles.</h2>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      nodes,
    },
  }
}
