import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
import classNames from "classnames"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Layout, LayoutProps } from "components/layout"
import { NodePage } from "components/node--page"

const RESOURCE_TYPES = [
  "node--page",
]

interface IndexPageProps extends LayoutProps {
  node: DrupalNode
}

export default function IndexPage({
  menus,
  node
}: IndexPageProps) {
  return (
    <Layout meta={{ title: "home" }} menus={menus}>
      <div className="container p-10">
        <NodePage node={node as DrupalNode} />
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

  // Get the Homepage by UUID.
  // /jsonapi/node/page/482e1cc3-d016-47d8-a164-53d7fb0b6b7e?include=field_page_images.field_media_image&fields[file--file]=uri,url
  const params = new DrupalJsonApiParams()
  .addInclude(["field_page_images.field_media_image"])
  .addFields("node--page", ["title", "body", "status", "field_page_images"])
  .addFields("media--image", ["field_media_image"])
  .addFields("file--file", ["uri", "resourceIdObjMeta"])

  const node = await drupal.getResource<DrupalNode>(
    "node--page",
    "482e1cc3-d016-47d8-a164-53d7fb0b6b7e",
    {
      params: params.getQueryObject(),
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      node,
    },
  }
}
