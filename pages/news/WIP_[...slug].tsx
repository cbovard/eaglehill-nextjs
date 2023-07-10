import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { getGlobalElements } from "lib/get-global-elements"
import { Layout, LayoutProps } from "components/layout"
import { Pager, PagerProps } from "components/pager"
import { getCustomDrupalView } from "lib/utils"
import { PageHeader } from "components/page-header"
import { Node } from "components/node"

const RESOURCE_TYPES = [
  "node--page",
]

interface NewsNodeProps extends LayoutProps {
  resource: DrupalNode
}

export default function ResourcePage({
  resource,
  menus,
}: NewsNodeProps) {
  if (!resource) return null

  //console.log(resource);

  return (
    <Layout
      menus={menus}
      meta={{
        title: resource.title || resource.name,
      }}
    >
      boom
      {/* {resource.type === "node--page" && (
        <NodePage node={resource as DrupalNode} />
      )} */}
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ResourcePageProps>> {
  const path = await drupal.translatePathFromContext(context)


  // If path is not found or the resource is not one we care about,
  // return a 404.
  if (!path || !RESOURCE_TYPES.includes(path.jsonapi.resourceName)) {
    return {
      notFound: true,
    }
  }

  // Fetch the resource from Drupal.
  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: getParams(path.jsonapi.resourceName)?.getQueryObject(),
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return 404.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await getGlobalElements(context)),
      resource,
    },
  }
}
