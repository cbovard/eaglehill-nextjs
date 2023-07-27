import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
// import { useRouter } from "next/router"

import { drupal } from "lib/drupal"
import { getGlobalElements } from "lib/get-global-elements"
import { getParams } from "lib/get-params"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Layout, LayoutProps } from "components/layout"
import { PageHeader } from "components/page-header"
import { NodeLivestockTeaser } from "components/node--livestock--teaser"

interface LivestockPageProps extends LayoutProps {
  livestockView: any,
}

export default function LivestockPage({
  menus,
  blocks,
  livestockView,
}: LivestockPageProps) {

  // console.log(livestockView);

  return (
    <Layout meta={{ title: "Our Livestock" }} menus={menus} blocks={blocks}>
      <PageHeader
        heading="Our Livestock"
        breadcrumbs={[
          {
            title: "Our Livestock",
          },
        ]}
      />
      <div className="container">
        <div>
          <p>Welcome to our livestock page, we first feature our stallions and then our mares, donkeys, and mules. Look around and pick out your next champion, partner, and friend.</p>
          <p>We believe an important part of the foundation, of a good breeding program, is its Mares. With that in mind, we choose ours for conformation, attitude, pedigree, and suitability for our chosen focus. Our small standard donkeys are wonderful pets with abundance of personality, always an enjoyable part of our farm.</p>
          <p>SIRTAINLY SIERRA, a 2005 Bay Stallion with Multiple Grands/Reserves & Circuit Championships • Open and Amateur ROMs, Multiple World Show Qualifier • 5 Canadian National Championship Titles • Canadian National Supreme Stallion,2007.  We have had a great year showing and Sirtainly Sierra has earned AQHA SUPERIOR HALTER HORSE!!!!!!!!!!!!!</p>
          <p>TRIPLE X FELLA, 2005 Palomino Overo Stallion, HYPP N/N, OLWS Neg, 34 Halter Points PtHAAQHA#4885339, APHA#834,913, PHBA#86244, and PtHA#127080Sire: Mr Yella Fella-Two Time AQHA World Champion,Two Time PHBA World Champion, AQHA Superior Halter Horse with 173.5 Points, Congress Champion Amateur Aged Stallion,Res. Champion Open Aged StallionDam: PromiseMeaScotchman-155 APHA Halter Points, APHA World Top 5Triple X Fella is the sire of Multiple Futurity Winners, watch for his foals in the Show Pen! Consider the possibilities with your mares.</p>
          <p>Junior Stallion HCF Lawless, APHA Black and White Tovero, currently in training, Limited stud book. Amazing movement and size.  Watch for this exciting stallion at the shows</p>
          <p>AQHA Halter: Evaluates conformation of the American Quarter Horse as a breed. Halter classes are divided by age and sex. Horses are shown with a leather halter and are traveled before the judges so that lameness and quality of movement can be evaluated. Horses are judged on balance, structural correctness, breed and sex characteristics and degree of muscling. Of these, balance is the most important..</p>
          <p>CONTACT PHONE NUMBER Cell 403-996-3105 Farm 403-556-1195</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {livestockView.results.map((livestock: DrupalNode) => (
            <NodeLivestockTeaser key={livestock.id} node={livestock} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<LivestockPageProps>> {

  //console.log(context);

  // todo need to move this more to a global.
  // /jsonapi/views/livestock/page_livestock?fields%5Bnode--livestock%5D=title%2Cbody%2Cpath%2Cfield_livestock_images&fields%5Bmedia--image%5D=field_media_image&fields%5Bfile--file%5D=uri%2CresourceIdObjMeta&include=field_livestock_images.field_media_image
  const params = new DrupalJsonApiParams()
    .addInclude(["field_livestock_images.field_media_image"])
    .addFields("node--livestock", ["title", "body", "path", "field_livestock_images"])
    .addFields("media--image", ["field_media_image"])
    .addFields("file--file", ["uri", "resourceIdObjMeta"])
    // .addPageLimit(5)
    // .addCustomParam({ 'bar: ['a', 'b', 'c']})

  // const viewJSON = params.getQueryObject();
  // viewJSON['page'] = 1;
  // console.log(viewJSON);

  // console.log(JSON.stringify(params.getQueryObject()));

  // const queryString = params.getQueryString({ encode: false });


  const livestockView = await drupal.getView("livestock--page_news_1", {
    params: params.getQueryObject(),
  })

  return {
    props: {
      ...(await getGlobalElements(context)),
      livestockView,
    },
  }
}