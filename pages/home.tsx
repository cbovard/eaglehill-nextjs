import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalView, DrupalNode } from "next-drupal";
import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { Layout, LayoutProps } from "components/layout";
import Carousel from "components/carousel";
import { NodeFrontPage } from "components/node--front--page";

interface IndexPageProps extends LayoutProps {
  slideShowBlock: DrupalView;
  node: DrupalNode;
}

export default function IndexPage({
  menus,
  slideShowBlock,
  node,
  blocks,
}: IndexPageProps) {
  return (
    <Layout meta={{ title: "Home" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      {/* <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        </section> */}
      <div className="p-5">
        <NodeFrontPage node={node as DrupalNode} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IndexPageProps>> {
  // Get the Homepage by UUID.
  // /jsonapi/node/page/482e1cc3-d016-47d8-a164-53d7fb0b6b7e?include=field_page_images.field_media_image&fields[file--file]=uri,url
  const params = new DrupalJsonApiParams()
    .addInclude(["field_page_images.field_media_image"])
    .addFields("node--page", ["title", "body", "status", "field_page_images"])
    .addFields("media--image", ["field_media_image"])
    .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"]);

  const node = await drupal.getResource<DrupalNode>(
    "node--page",
    "482e1cc3-d016-47d8-a164-53d7fb0b6b7e",
    {
      params: params.getQueryObject(),
    },
  );

  const slideShowBlock = await drupal.getView<DrupalView[]>(
    "slideshows--front_slideshow_block",
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
