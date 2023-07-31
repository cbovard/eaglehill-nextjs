import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { Layout, LayoutProps } from "components/layout";
import { PageHeader } from "components/page-header";
import { NodeLivestockTeaser } from "components/node--livestock--teaser";

interface ForSalePageProps extends LayoutProps {
  livestockView: any;
}

export default function ForSalePage({
  menus,
  livestockView,
}: ForSalePageProps) {
  console.log(livestockView);

  return (
    <Layout
      menus={menus}
      meta={{
        title: "For Sale",
      }}
    >
      <PageHeader
        heading="For Sale"
        breadcrumbs={[
          {
            title: "For Sale",
          },
        ]}
      />
      <div className="container">
        <div>
          <p>
            Here we hope you find the animal of your dreams. For Horses or
            Donkeys we have a colorful selection. Please contact us if you would
            like more information. Click on the picture to see pedigrees,
            descriptions and larger pictures. All prices are in Canadian
            dollars. Thank you to all who have purchased our animals. We know
            they have great homes and you will enjoy them as we did while they
            lived here!
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {livestockView.results.map((livestock: DrupalNode) => (
            <NodeLivestockTeaser key={livestock.id} node={livestock} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ForSalePageProps>> {
  // todo need to move this more to a global.
  // /jsonapi/views/livestock/page_for_sale?fields%5Bnode--livestock%5D=title%2Cbody%2Cpath%2Cfield_livestock_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_livestock_images.field_media_image
  const params = new DrupalJsonApiParams()
    .addInclude(["field_livestock_images.field_media_image"])
    .addFields("node--livestock", [
      "title",
      "body",
      "path",
      "field_livestock_images",
    ])
    .addFields("media--image", ["field_media_image"])
    .addFields("file--file", ["uri", "resourceIdObjMeta"]);

  const livestockView = await drupal.getView("livestock--page_for_sale", {
    params: params.getQueryObject(),
  });

  return {
    props: {
      ...(await getGlobalElements(context)),
      livestockView,
    },
  };
}
