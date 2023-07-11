import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { Node } from "components/node"

const RESOURCE_TYPES = ["node--page", "node--news", "node--livestock"]

interface NodePageProps extends LayoutProps {
  node: DrupalNode
}

export default function NodePage({
  menus,
  blocks,
  node,
}: NodePageProps) {

  return (
    <Layout meta={{ title: node.title }} menus={menus} blocks={blocks}>
      <Node node={node} />
    </Layout>
  )
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NodePageProps>> {

  const path = await drupal.translatePathFromContext(context)
  if (!path || !RESOURCE_TYPES.includes(path.jsonapi.resourceName)) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName
  const node = await drupal.getResourceFromContext<DrupalNode>(path, context, {
    params: getParams(type),
  })

  if (!node || (!context.preview && node?.status === false)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await getGlobalElements(context)),
      node,
    },
  }
}
