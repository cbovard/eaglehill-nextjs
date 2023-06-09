import { GetServerSidePropsContext, GetStaticPropsContext } from "next"
import { DrupalBlock, DrupalView } from "next-drupal"

import { drupal } from "lib/drupal"
import { getParams } from "lib/get-params"
import { LayoutProps } from "components/layout"

type GlobalElements = LayoutProps

// This is a helper function to fetch global elements for layout.
// This is going to be run for every pages on build.
// To make this fast, you could cache the results example on Redis.
export async function getGlobalElements(
  context: GetStaticPropsContext | GetServerSidePropsContext
): Promise<GlobalElements> {
  const menuOpts = {
    params: getParams("menu_link_content--menu_link_content").getQueryObject(),
  }

  // Fetch menu items.
  const mainMenu = await drupal.getMenu("main", menuOpts)
  const quickLinksMenu = await drupal.getMenu("header-quick-links", menuOpts)
  const footerMenu = await drupal.getMenu("footer", menuOpts)

  // Fetch news block view.
  const { results: newsBlock } = await drupal.getView<DrupalBlock[]
  >("news--block_news_1", {
    params: getParams("block_content--news_block").getQueryObject(),
  })

  return {
    menus: {
      main: mainMenu.items,
      quickLinks: quickLinksMenu.items,
      footer: footerMenu.items,
    },
    blocks: {
      newsBlock,
    },
  }
}
