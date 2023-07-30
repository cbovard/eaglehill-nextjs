import classNames from "classnames";
import { DrupalMenuLinkContent } from "next-drupal";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuMainProps {
  items: DrupalMenuLinkContent[];
}

export function MenuMain({ items, ...props }: MenuMainProps) {
  const router = useRouter();

  return (
    <nav className="lg:flex lg:justify-end md:mt-7 lg:mt-0" {...props}>
      <ul
        className="flex lg:inline-flex flex-col space-y-2.5 mt-4 md:mt-0 md:space-y-0 md:flex-row md:justify-center lg:justify-end
          md:rounded-t-md md:border-x md:border-t md:border-deep-fir-800 md:bg-gradient-to-b md:from-deep-fir-900 md:to-deep-fir-950"
      >
        {items.map((item) => {
          const isActive =
            router.asPath === item.url ||
            `/${router.locale}${router.asPath === "/" ? "" : router.asPath}` ===
              item.url ||
            (item.url !== "/" ? router.asPath.indexOf(item.url) === 0 : false);

          return (
            <li key={item.id}>
              <Link
                href={item.url}
                passHref
                className={classNames(
                  "block pt-[0.70rem] pb-2 pl-3 pr-4 md:px-4 rounded md:rounded-none border md:border-none border-deep-fir-800 bg-gradient-to-b from-deep-fir-900 to-deep-fir-950 font-bebas-neue text-2xl tracking-wide transition-colors hover:text-amber-400",
                  {
                    "text-white": !isActive,
                    "text-amber-400": isActive,
                  },
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
