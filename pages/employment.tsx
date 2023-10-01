import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalView, DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { Layout, LayoutProps } from "components/layout";
import Carousel from "components/carousel";
import { NodeEmploymentPage } from "components/node--employment--page";

interface EmploymentPageProps extends LayoutProps {
  slideShowBlock: DrupalView;
  node: DrupalNode;
}

export default function EmploymentPage({
  menus,
  blocks,
  slideShowBlock,
  node,
}: EmploymentPageProps) {
  return (
    <Layout meta={{ title: "Employment" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      <div className="g:grid-rows-1 p-5 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <NodeEmploymentPage node={node} />
        </div>
        <aside className="hidden lg:col-span-3 lg:block">
          <h2 className="text-white">Sidebar on larger</h2>
          <p className="text-white">Going to add the Sidebar fun soon</p>
        </aside>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<EmploymentPageProps>> {
  // Get the Employment page by UUID.
  // /jsonapi/node/page/d900edfb-ea7a-43a1-ada0-fc8d11d64401?include=field_page_images.field_media_image&fields[file--file]=uri,url
  const params = new DrupalJsonApiParams()
    .addInclude(["field_page_images.field_media_image"])
    .addFields("node--page", ["title", "body", "status", "field_page_images"])
    .addFields("media--image", ["field_media_image"])
    .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"]);

  const node = await drupal.getResource<DrupalNode>(
    "node--page",
    "d900edfb-ea7a-43a1-ada0-fc8d11d64401",
    {
      params: params.getQueryObject(),
    },
  );

  const slideShowBlock = await drupal.getView<DrupalView[]>(
    "slideshows--sub_slideshow_block",
    {
      params: getParams("slideshows--slideshow_block").getQueryObject(),
    },
  );

  return {
    props: {
      ...(await getGlobalElements(context)),
      slideShowBlock,
      node,
    },
  };
}
