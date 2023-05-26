import Link from "next/link"
import {DrupalMenuLinkContent} from "next-drupal"

import { MenuFooter } from "components/menu-footer"

export interface FooterProps {
  menus: {
    footer: DrupalMenuLinkContent[]
  }
}

export function Footer({ menus }: FooterProps) {

  return (
    <footer>
      <section className="py-8 text-white bg-gray-darker">
        <div className="container justify-between lg:grid lg:grid-cols-[6fr_1.5fr_2.5fr]">
          {menus?.footer?.length ? (
            <div className="pt-10 text-center lg:text-left lg:col-start-3">
              <MenuFooter items={menus.footer} />
            </div>
          ) : null}
        </div>
      </section>
    </footer>
  )
}
