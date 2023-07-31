import Link from "next/link";
import { DrupalMenuLinkContent } from "next-drupal";

interface MenuFooterProps {
  items: DrupalMenuLinkContent[];
}

export function MenuFooter({ items, ...props }: MenuFooterProps) {
  return (
    <nav {...props}>
      <ul className="flex flex-col space-y-1 md:space-y-2 lg:space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              passHref
              className="text-sm text-gray-100 no-underline transition-all duration-200 hover:text-lime-500 hover:underline md:text-base lg:text-lg"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
