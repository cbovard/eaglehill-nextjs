import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { Layout, LayoutProps } from "components/layout";
import { PageHeader } from "components/page-header";
import { NodeLivestockTeaser } from "components/node--livestock--teaser";

interface HorsesPageProps extends LayoutProps {
  livestockView: any;
}

export default function HorsesPage({ menus, livestockView }: HorsesPageProps) {
  return (
    <Layout
      menus={menus}
      meta={{
        title: "Our Horses",
      }}
    >
      <PageHeader
        heading="Our Horses"
        breadcrumbs={[
          {
            title: "Our Horses",
          },
        ]}
      />
      <div className="container">
        <div>
          <p>
            Producing outstanding Halter and All Around Quarter Horses. Look
            here for your next Champion, friend and partner.
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
): Promise<GetStaticPropsResult<HorsesPageProps>> {
  // todo need to move this more to a global.
  // /jsonapi/views/livestock/page_horses?fields%5Bnode--livestock%5D=title%2Cbody%2Cpath%2Cfield_livestock_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_livestock_images.field_media_image
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

  const livestockView = await drupal.getView("livestock--page_horses", {
    params: params.getQueryObject(),
  });

  return {
    props: {
      ...(await getGlobalElements(context)),
      livestockView,
    },
  };
}
