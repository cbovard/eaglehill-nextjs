import * as React from "react"
import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"
import classNames from "classnames"

import siteConfig from "site.config"
// import { Logo } from "components/logo"
import Image from 'next/image'
import logoImage from '../public/images/logo.png'
import { MenuMain } from "components/menu-main"
import { MenuQuickLinks } from "components/menu-quick-links"

export interface HeaderProps {
  menus: {
    main: DrupalMenuLinkContent[],
    quickLinks: DrupalMenuLinkContent[]
  }
}

export function Header({ menus }: HeaderProps) {
  const [showMenu, setShowMenu] = React.useState<Boolean>(false)

  return (
    <header className="xl:container xl:mx-auto p-5">
      <div className="hidden">
        <MenuQuickLinks items={menus.quickLinks} />
      </div>
      <div className="w-full">
        <div className="max-w-[70%] mx-auto pt-3">
          <Link href="/" passHref>
            <Image
              src={logoImage}
              alt={siteConfig.name}
              priority={true}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
        </div>
      </div>
      <button className="absolute right-5 top-8 w-8 h-8 md:hidden border border-transparent text-white focus:outline-none bg-transparent"
      onClick={() => setShowMenu(!showMenu)}
      >
        <span className="sr-only">Open main menu</span>
        <span className="block w-7 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span aria-hidden="true"
            className={classNames(
              "block absolute h-[0.1875rem] w-7 bg-current transform transition duration-500 ease-in-out",
              {
                "rotate-45": showMenu,
                "-translate-y-[0.475rem]": !showMenu,
              }
            )}
          >
          </span>
          <span aria-hidden="true"
            className={classNames(
              "block absolute h-[0.1875rem] w-7 bg-current transform transition duration-500 ease-in-out",
              {
                "opacity-0": showMenu,
              }
            )}
          >
          </span>
          <span aria-hidden="true"
            className={classNames(
              "block absolute h-[0.1875rem] w-7 bg-current transform transition duration-500 ease-in-out",
              {
                "-rotate-45": showMenu,
                "translate-y-[0.475rem]": !showMenu,
              }
            )}
          >
          </span>
        </span>
      </button>
      <div
        className={classNames(
          "max-h-0 transition-all overflow-hidden md:max-h-screen",
          {
            "max-h-screen": showMenu,
          }
        )}
      >
        <MenuMain items={menus.main} />
      </div>
    </header>
  );
}
