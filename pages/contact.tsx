import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import { getGlobalElements } from "lib/get-global-elements";
import { Layout, LayoutProps } from "components/layout";
import { PageHeader } from "components/page-header";
import { FormContact } from "components/form--contact";

interface ContactPageProps extends LayoutProps {}

export default function ContactPage({ menus }: ContactPageProps) {
  return (
    <Layout
      meta={{
        title: "Contact Us",
      }}
      menus={menus}
    >
      <PageHeader
        heading={"Contact Us"}
        breadcrumbs={[
          {
            title: "Contact Us",
          },
        ]}
      />
      <div className="container">
        <div className="mx-auto max-w-xl pb-8">
          <FormContact />
        </div>
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
