import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Layout, LayoutProps } from "components/layout"
import { PageHeader } from "components/page-header"
import { NodeLivestockTeaser } from "components/node--livestock--teaser"

interface StallionsPageProps extends LayoutProps {
  livestockView: any,
}

export default function StallionsPage({
  menus,
  livestockView,
}: StallionsPageProps) {

  //console.log(livestockView.results, 'livestock 3');

  return (
    <Layout
      menus={menus}
      meta={{
        title: "Stallions",
      }}
    >
      <PageHeader
        heading="Stallions"
        breadcrumbs={[
          {
            title: "Stallions",
          },
        ]}
      />
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {livestockView.results.map((livestock) => (
            <NodeLivestockTeaser key={livestock.id} node={livestock} />
          ))}
          {/* {recipes.map((recipe) => (
            <NodeRecipeTeaser key={recipe.id} node={recipe} />
          ))} */}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<StallionsPageProps>> {

  // todo need to move this more to a global.
  // /jsonapi/views/livestock/page_stallions?fields%5Bnode--livestock%5D=title%2Cbody%2Cpath%2Cfield_livestock_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_livestock_images.field_media_image
  const params = new DrupalJsonApiParams()
  .addInclude(["field_livestock_images.field_media_image"])
  .addFields("node--livestock", ["title", "body", "path", "field_livestock_images"])
  .addFields("media--image", ["field_media_image"])
  .addFields("file--file", ["uri", "resourceIdObjMeta"])

  const livestockView = await drupal.getView("livestock--page_stallions", {
    params: params.getQueryObject(),
  })

  return {
    props: {
      ...(await getGlobalElements(context)),
      livestockView,
    },
  }
}
