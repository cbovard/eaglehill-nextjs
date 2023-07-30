import Link from "next/link";
import { DrupalMenuLinkContent } from "next-drupal";

interface MenuQuickLinksProps {
  items: DrupalMenuLinkContent[];
}

export function MenuQuickLinks({ items, ...props }: MenuQuickLinksProps) {
  return (
    <nav {...props}>
      <ul className="flex space-x-5">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              passHref
              className="text-sm text-gray-400 transition-all hover:text-lime-500 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
