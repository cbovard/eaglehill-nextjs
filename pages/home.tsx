import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
import classNames from "classnames"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Layout, LayoutProps } from "components/layout"
import Carousel from "components/carousel";
import { NodeFrontPage } from "components/node--front--page"

interface IndexPageProps extends LayoutProps {
  node: DrupalNode
}

export default function IndexPage({
  menus,
  node,
  blocks
}: IndexPageProps) {

  const images = [
    'https://images.dog.ceo/breeds/weimaraner/n02092339_8024.jpg',
    'https://images.dog.ceo/breeds/poodle-standard/n02113799_1140.jpg',
    'https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190611_152047.jpg',
  ];

  // console.log(images);


  return (
    <Layout meta={{ title: "Home" }} menus={menus} blocks={blocks}>
      <div className="container p-10">
        {/* <Carousel images={images} /> */}
      </div>
      <div className="container p-10 bg">
        <NodeFrontPage node={node as DrupalNode} />
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IndexPageProps>> {

  // Get the Homepage by UUID.
  // /jsonapi/node/page/482e1cc3-d016-47d8-a164-53d7fb0b6b7e?include=field_page_images.field_media_image&fields[file--file]=uri,url
  const params = new DrupalJsonApiParams()
  .addInclude(["field_page_images.field_media_image"])
  .addFields("node--page", ["title", "body", "status", "field_page_images"])
  .addFields("media--image", ["field_media_image"])
  .addFields("file--file", ["uri", "resourceIdObjMeta", "image_style_uri"])

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
