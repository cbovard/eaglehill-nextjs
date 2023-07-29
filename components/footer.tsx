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
        <div className="bg-[#26262680] px-4 pt-4 pb-5">
          {blocks?.newsBlock && (
            <div className="text-left">
              <h4 className="font-bebas-neue text-3xl tracking-wide text-deep-fir-100 mb-2">Latest News</h4>
              {blocks.newsBlock.map((news_node) => (
                <article key={news_node.id} className="pt-3 pb-3">
                  <h5 className="text-white text-lg mb-1">
                    <Link href={news_node.path.alias}
                      className="transition-all underline underline-offset-2 hover:underline-offset-4"
                      passHref>
                      {news_node.title}
                    </Link>
                  </h5>
                  {news_node.body.processed && (
                    <section>
                      <p className="text-white text-base">{news_node.body?.processed && <TeaserText text={news_node.body.processed} maxLength={110} />}</p>
                    </section>
                  )}
                  <Link href={news_node.path.alias}
                    className="text-deep-fir-400 text-sm transition-all underline underline-offset-1 hover:underline-offset-2"
                    passHref>
                    more
                  </Link>
                </article>
              ))}
            </div>
          )}
          <div className="mt-3 mb-4">
            <ul className="flex items-center space-x-4">
              <li className="w-10 h-10 rounded-full flex items-center justify-center">
                <a className="block" href="https://www.facebook.com/eaglehillequine" target="_blank" title="Eagle Hill Equine - Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-all hover:text-deep-fir-400" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </li>
              <li className="w-10 h-10 rounded-full flex items-center justify-center">
                <a href="https://www.youtube.com/@kimbaerg8365" target="_blank" title="Eagle Hill Equine - Youtube">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-all hover:text-deep-fir-400" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          {menus?.footer?.length ? (
            <div className="mb-6">
              <MenuFooter items={menus.footer} />
            </div>
          ) : null}
          <h6 className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Eagle Hill Equine</h6>
        </div>
      </div>
    </footer>
  )
}
