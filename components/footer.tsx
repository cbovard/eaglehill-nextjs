import { DrupalMenuLinkContent, DrupalBlock } from "next-drupal";
import Link from "next/link";
import { TeaserText } from "./formatted-text";
import { MenuFooter } from "components/menu-footer";

export interface FooterProps {
  menus: {
    footer: DrupalMenuLinkContent[];
  };
  blocks: {
    newsBlock: any;
  };
}

export function Footer({ menus, blocks }: FooterProps) {
  //console.log(blocks.newsBlock);

  return (
    <footer
      role="contentinfo"
      className="w-full bg-grass-pattern bg-bottom bg-repeat-x"
    >
      <div className="px-5 xl:container xl:mx-auto">
        <div className="bg-[#26262680] p-4 md:py-5 xl:p-8">
          <div className="md:flex md:justify-between md:gap-8">
            {blocks?.newsBlock && (
              <div className="text-left md:w-9/12 md:flex-auto md:pr-6">
                <h4 className="mb-1 font-bebas-neue text-3xl tracking-wide text-deep-fir-100">
                  Latest News
                </h4>
                {blocks.newsBlock.map((news_node) => (
                  <article key={news_node.id} className="pb-3.5 lg:max-w-2xl">
                    <h5 className="mb-1 text-lg text-white">
                      <Link
                        href={news_node.path.alias}
                        className="underline underline-offset-2 transition-all duration-200 hover:underline-offset-4"
                        passHref
                      >
                        {news_node.title}
                      </Link>
                    </h5>
                    {news_node.body?.processed && (
                      <section>
                        <p className="text-base text-white">
                          <TeaserText
                            text={news_node.body.processed}
                            maxLength={110}
                          />
                        </p>
                      </section>
                    )}
                    <Link
                      href={news_node.path.alias}
                      className="text-sm text-deep-fir-400 underline underline-offset-1 transition-all duration-200 hover:underline-offset-2"
                      passHref
                    >
                      More News
                    </Link>
                  </article>
                ))}
              </div>
            )}
            {menus?.footer?.length ? (
              <div className="mb-5 mt-2 md:m-0 md:w-3/12 md:flex-auto lg:pl-10">
                <MenuFooter items={menus.footer} />
              </div>
            ) : null}
          </div>
          <div className="mt-8 justify-between py-6 sm:flex md:mt-6 md:items-center md:p-0 lg:mt-10 lg:pb-2">
            <div className="mb-5 mt-2 md:m-0">
              <ul className="flex items-center space-x-4">
                <li className="flex h-10 w-10 items-center justify-center rounded-full">
                  <a
                    className="block"
                    href="https://www.facebook.com/eaglehillequine"
                    target="_blank"
                    title="Eagle Hill Equine - Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-100 transition-all duration-200 hover:text-deep-fir-400"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="flex h-10 w-10 items-center justify-center rounded-full">
                  <a
                    href="https://www.youtube.com/@kimbaerg8365"
                    target="_blank"
                    title="Eagle Hill Equine - Youtube"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-100  transition-all duration-200 hover:text-deep-fir-400"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <p className="mt-3 text-xs font-semibold text-gray-400 md:m-0 md:text-sm">
              &copy; {new Date().getFullYear()} Eagle Hill Equine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
