import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"

interface MenuQuickLinksProps {
  items: DrupalMenuLinkContent[]
}

export function MenuQuickLinks({ items, ...props }: MenuQuickLinksProps) {
  return (
    <nav {...props}>
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              passHref
              className="text-sm font-semibold transition-colors text-gray-600 hover:bg-black hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}