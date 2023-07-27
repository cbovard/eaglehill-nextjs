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
    <footer className="w-full bg-grass-pattern bg-repeat-x bg-bottom">
      <div className="xl:container xl:mx-auto px-5">
        <div className="bg-[#26262680] px-4">
          {blocks?.newsBlock && (
            <div className="text-left">
              <h4 className="text-white uppercase font-semibold">Latest News</h4>
              {blocks.newsBlock.map((news_node) => (
                <article key={news_node.id}>
                  <h5 className="flex-1 text-2xl">
                    <Link href={news_node.path.alias}
                      className="hover:underline text-white text-link"
                      passHref>
                      {news_node.title}
                    </Link>
                  </h5>
                  {news_node.body.processed && (
                    <section>
                      <p className="text-white">{news_node.body?.processed && <TeaserText text={news_node.body.processed} maxLength={110} />}</p>
                    </section>
                  )}
                  <Link href={news_node.path.alias}
                    className="hover:underline text-white text-link"
                    passHref>
                    more
                  </Link>
                </article>
              ))}
            </div>
          )}
          {menus?.footer?.length ? (
            <div className="pt-10">
              <MenuFooter items={menus.footer} />
            </div>
          ) : null}
          <h6 className="text-white">&copy; {new Date().getFullYear()} Eagle Hill Equine</h6>
        </div>
      </div>
    </footer>
  )
}
