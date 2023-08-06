import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import { getGlobalElements } from "lib/get-global-elements";
import { Layout, LayoutProps } from "components/layout";
import { PageHeader } from "components/page-header";
import { FormContact } from "components/form--contact";

interface ContactPageProps extends LayoutProps {}

export default function ContactPage({ menus, blocks }: ContactPageProps) {
  return (
    <Layout meta={{ title: "Contact Us" }} menus={menus} blocks={blocks}>
      {/* <PageHeader
        heading={"Contact Us"}
        breadcrumbs={[
          {
            title: "Contact Us",
          },
        ]}
      /> */}
      <div className="lg:h-60 lg:px-5">
        <div className="p-20 outline outline-1 outline-orange-100 lg:h-60">
          <p className="text-white">Slider here soon</p>
        </div>
      </div>
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
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  };
}
