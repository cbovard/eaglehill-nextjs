import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { DrupalView } from "next-drupal";
import { drupal } from "lib/drupal";
import { getGlobalElements } from "lib/get-global-elements";
import { getParams } from "lib/get-params";
import { Layout, LayoutProps } from "components/layout";
import Carousel from "components/carousel";
import { FormContact } from "components/form--contact";

interface ContactPageProps extends LayoutProps {
  slideShowBlock: DrupalView;
}

export default function ContactPage({
  menus,
  blocks,
  slideShowBlock,
}: ContactPageProps) {
  return (
    <Layout meta={{ title: "Contact Us" }} menus={menus} blocks={blocks}>
      <Carousel images={slideShowBlock} />
      <div className="g:grid-rows-1 p-5 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="pt-5 lg:col-span-9">
          <FormContact />
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
): Promise<GetStaticPropsResult<ContactPageProps>> {
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
    },
  };
}
