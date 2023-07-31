import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { Layout, LayoutProps } from "components/layout";
import { PageHeader } from "components/page-header";
import { NodeLivestockTeaser } from "components/node--livestock--teaser";

interface ShowHorsesPageProps extends LayoutProps {
  livestockView: any;
}

export default function ShowHorsesPage({
  menus,
  livestockView,
}: ShowHorsesPageProps) {
  return (
    <Layout
      menus={menus}
      meta={{
        title: "Show Horses",
      }}
    >
      <PageHeader
        heading="Show Horses"
        breadcrumbs={[
          {
            title: "Show Horses",
          },
        ]}
      />
      <div className="container">
        <div>
          <p>
            Full service Equestrian Center offering professional and expert
            equine training, coaching, sales and breeding from beginner and
            recreational to World Class Levels!
          </p>
          <p>
            EAGLE HILL EQUINE IS NOW OFFERING WORLD CLASS HALTER
            FITTING.AQHA/APHA Halter: Evaluates conformation of the American
            Quarter Horse/American Paint Horse as a breed. Halter classes are
            divided by age and sex. Horses are shown with a leather halter and
            are traveled before the judges so that lameness and quality of
            movement can be evaluated. Horses are judged on balance, structural
            correctness, breed and sex characteristics and degree of muscling.
            Of these, balance is the most important.Eagle Hill Equine and
            LaPlaine Quarter Horses and Paints have combined their expertise!
            Now offer a limited number of Halter fitting openings for the 2020
            Show Season. Contact us for pricing and availably.
            eaglehillequine@live.ca 403-556-1195-. Eagle Hill Equine has
            everything needed to produce your World Champion!
          </p>
          <p>
            We welcome resident trainers Henry and Nicole Gauthier (APHA
            Professional Horseman) and Assistant Trainer Leah Currie. With over
            25 years of experience LaPlaine QH & Paints offers expert training,
            sales, coaching and breeding from beginner/recreational to World
            Show levels. Also your local Excel Supplements dealer, contact
            Nicole for more information 306-467-7410
          </p>
          <p>
            THOUGHT: Many have the desire to win.............few the will to
            prepare.
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
): Promise<GetStaticPropsResult<ShowHorsesPageProps>> {
  // todo need to move this more to a global.
  // /jsonapi/views/livestock/page_show_horses?fields%5Bnode--livestock%5D=title%2Cbody%2Cpath%2Cfield_livestock_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_livestock_images.field_media_image
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

  const livestockView = await drupal.getView("livestock--page_show_horses", {
    params: params.getQueryObject(),
  });

  return {
    props: {
      ...(await getGlobalElements(context)),
      livestockView,
    },
  };
}
