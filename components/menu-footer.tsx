import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"

interface MenuFooterProps {
  items: DrupalMenuLinkContent[]
}

export function MenuFooter({ items, ...props }: MenuFooterProps) {
  return (
    <nav {...props}>
      <ul className="flex flex-col space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              passHref
              className="text-base text-white transition-all underline underline-offset-2 hover:underline-offset-4">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
