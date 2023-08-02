import { Meta, MetaProps } from "components/meta";
import { Header, HeaderProps } from "components/header";
import { Footer, FooterProps } from "components/footer";
import { TailwindIndicator } from "components/tailwind-indicator";

export interface LayoutProps extends HeaderProps, FooterProps {
  meta?: MetaProps;
  menus: HeaderProps["menus"] & FooterProps["menus"];
  children?: React.ReactNode;
}

export function Layout({ meta, menus, children, blocks }: LayoutProps) {
  return (
    <>
      <Meta {...meta} />
      <Header menus={{ main: menus.main, quickLinks: menus.quickLinks }} />
      <main role="main" className="xl:container xl:mx-auto">
        {children}
      </main>
      <Footer menus={{ footer: menus.footer }} blocks={blocks} />
      <TailwindIndicator />
    </>
  );
}
