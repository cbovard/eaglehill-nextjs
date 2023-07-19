import classNames from "classnames"
import { DrupalMenuLinkContent } from "next-drupal"
import Link from "next/link"
import { useRouter } from "next/router"

interface MenuMainProps {
  items: DrupalMenuLinkContent[]
}

export function MenuMain({ items, ...props }: MenuMainProps) {
  const router = useRouter()

  return (
    <nav {...props}>
      <ul className="flex flex-col space-y-2.5 mt-4 md:mt-0 md:space-y-0">
        {items.map((item) => {
          const isActive =
            router.asPath === item.url ||
            `/${router.locale}${router.asPath === "/" ? "" : router.asPath}` ===
              item.url ||
            (item.url !== "/" ? router.asPath.indexOf(item.url) === 0 : false)
          return (
            <li key={item.id}>
              <Link
                href={item.url}
                passHref
                className={classNames(
                  "block pt-[0.70rem] pb-2 pl-3 pr-4 rounded border border-lime-700 bg-gradient-to-b from-lime-800 to-lime-900 md:p-0 font-bebas-neue text-2xl tracking-wide text-white transition-colors hover:text-amber-400",
                  {
                    "text-amber-400": isActive,
                  }
                )}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
