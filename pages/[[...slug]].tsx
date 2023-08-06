import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { Layout, LayoutProps } from "components/layout";
import { Node } from "components/node";

const RESOURCE_TYPES = ["node--page", "node--news", "node--livestock"];

interface NodePageProps extends LayoutProps {
  node: DrupalNode;
}

export default function NodePage({ menus, blocks, node }: NodePageProps) {
  return (
    <Layout meta={{ title: node.title }} menus={menus} blocks={blocks}>
      <div className="lg:h-60 lg:px-5">
        <div className="p-20 outline outline-1 outline-orange-100 lg:h-60">
          <p className="text-white">Slider here soon</p>
        </div>
      </div>
      <div className="g:grid-rows-1 p-5 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <Node node={node} />
        </div>
        <aside className="hidden lg:col-span-3 lg:block">
          <h2 className="text-white">Sidebar on larger</h2>
          <p className="text-white">Going to add the Sidebar fun soon</p>
        </aside>
      </div>
    </Layout>
  );
}

export async function getStaticPaths(
  context: GetStaticPathsContext,
): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context);
  if (!path || !RESOURCE_TYPES.includes(path.jsonapi.resourceName)) {
    return {
      notFound: true,
    };
  }

  const type = path.jsonapi.resourceName;
  const node = await drupal.getResourceFromContext<DrupalNode>(path, context, {
    params: getParams(type),
  });

  if (!node || (!context.preview && node?.status === false)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await getGlobalElements(context)),
      node,
    },
  };
}
