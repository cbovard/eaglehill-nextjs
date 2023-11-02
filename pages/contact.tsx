import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalView } from "next-drupal";
import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { Layout, LayoutProps } from "components/layout";
import Carousel from "components/carousel";
import SidebarCtas from "components/sidebar";
import { FormContact } from "components/form--contact";

interface ContactPageProps extends LayoutProps {
  slideShowBlock: DrupalView;
  sidebarCtasBlock: DrupalView;
}

export default function ContactPage({
  menus,
  blocks,
  slideShowBlock,
  sidebarCtasBlock,
}: ContactPageProps) {
  return (
    <Layout meta={{ title: "Contact Us" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      <div className="g:grid-rows-1 p-5 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <FormContact />
        </div>
        <aside className="hidden pt-5 lg:col-span-3 lg:block">
          <SidebarCtas sidebarCtas={sidebarCtasBlock} />
        </aside>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<ContactPageProps>> {
  const slideShowBlock = await drupal.getView<DrupalView[]>(
    "slideshows--sub_slideshow_block",
    {
      params: getParams("slideshows--slideshow_block").getQueryObject(),
    },
  );

  const sidebarCtasBlock = await drupal.getView<DrupalView[]>(
    "sidebar_ctas--sidebar_ctas_block",
  );

  return {
    props: {
      ...(await getGlobalElements(context)),
      slideShowBlock,
      sidebarCtasBlock,
    },
  };
}
