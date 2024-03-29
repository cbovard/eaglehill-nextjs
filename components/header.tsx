import * as React from "react";
import { useRouter } from "next/router";
import { DrupalMenuLinkContent } from "next-drupal";
import classNames from "classnames";
import { Logo } from "components/logo";
import { MenuMain } from "components/menu-main";
import { MenuQuickLinks } from "components/menu-quick-links";

export interface HeaderProps {
  menus: {
    main: DrupalMenuLinkContent[];
    quickLinks: DrupalMenuLinkContent[];
  };
}

export function Header({ menus }: HeaderProps) {
  const [showMenu, setShowMenu] = React.useState<Boolean>(false);

  // TODO - move this to site.config.js ?
  const router = useRouter();
  const isFront = router.pathname === "/home";

  return (
    <header
      role="banner"
      className="relative z-10 p-5 xl:container md:py-0 lg:relative lg:flex lg:h-[14rem] lg:flex-col lg:justify-between xl:mx-auto"
    >
      <div className="hidden lg:flex lg:justify-end lg:pt-5">
        <MenuQuickLinks items={menus.quickLinks} />
      </div>
      <div className="w-full lg:absolute lg:left-5 lg:top-4 lg:w-[325px]">
        <div className="mx-auto max-w-[70%] pt-3 sm:max-w-[325px]">
          {isFront ? (
            <h1>
              <Logo />
            </h1>
          ) : (
            <Logo />
          )}
        </div>
      </div>
      <button
        className="absolute right-5 top-8 h-8 w-8 border border-transparent bg-transparent  text-white focus:outline-none md:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className="sr-only">Open main menu</span>
        <span className="absolute left-1/2 top-1/2 block w-7 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className={classNames(
              "absolute block h-[0.1875rem] w-7 transform bg-current transition duration-500 ease-in-out",
              {
                "rotate-45": showMenu,
                "-translate-y-[0.475rem]": !showMenu,
              },
            )}
          ></span>
          <span
            aria-hidden="true"
            className={classNames(
              "absolute block h-[0.1875rem] w-7 transform bg-current transition duration-500 ease-in-out",
              {
                "opacity-0": showMenu,
              },
            )}
          ></span>
          <span
            aria-hidden="true"
            className={classNames(
              "absolute block h-[0.1875rem] w-7 transform bg-current transition duration-500 ease-in-out",
              {
                "-rotate-45": showMenu,
                "translate-y-[0.475rem]": !showMenu,
              },
            )}
          ></span>
        </span>
      </button>
      <div
        className={classNames(
          "max-h-0 overflow-hidden transition-all md:max-h-screen md:transition-none lg:h-[52px]",
          {
            "max-h-screen": showMenu,
          },
        )}
      >
        <MenuMain items={menus.main} />
      </div>
    </header>
  );
}
