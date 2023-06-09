import { DrupalMenuLinkContent, DrupalBlock } from "next-drupal"
import Link from "next/link"
import { TeaserText } from "./formatted-text"
import { MenuFooter } from "components/menu-footer"

export interface FooterProps {
  menus: {
    footer: DrupalMenuLinkContent[]
  }
  blocks: {
    newsBlock: any
  }
}

export function Footer({ menus, blocks }: FooterProps) {
  return (
    <footer>
      <section className="py-8 text-white bg-gray-darker">
        <div className="container justify-between lg:grid lg:grid-cols-[6fr_1.5fr_2.5fr]">
          {blocks?.newsBlock && (
            <div className="text-left">
              <h4 className="text-black uppercase font-semibold">Latest News</h4>
              {blocks.newsBlock.map((news_node) => (
                <article key={news_node.id}>
                  <h5 className="flex-1 text-2xl">
                    <Link href={news_node.path.alias}
                      className="hover:underline text-black text-link"
                      passHref>
                      {news_node.title}
                    </Link>
                  </h5>
                  {news_node.body.processed && (
                    <section>
                      <p className="text-black">{news_node.body?.processed && <TeaserText text={news_node.body.processed} maxLength={110} />}</p>
                    </section>
                  )}
                  <Link href={news_node.path.alias}
                    className="hover:underline text-black text-link"
                    passHref>
                    more
                  </Link>
                </article>
              ))}
            </div>
          )}
          {menus?.footer?.length ? (
            <div className="pt-10 text-center lg:text-left lg:col-start-3">
              <MenuFooter items={menus.footer} />
            </div>
          ) : null}
        </div>
      </section>
      <p className="mb-6 md:mb-0">
        © {new Date().getFullYear()} Eagle Hill Equine
      </p>
    </footer>
  )
}
