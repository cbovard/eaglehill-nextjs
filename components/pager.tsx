import classNames from "classnames"

import { usePagination, usePaginationProps } from "lib/use-pagination"
import Link from "next/link"

export interface PagerProps extends React.HTMLAttributes<HTMLElement> {
  current: number
  total: number
  href: usePaginationProps["href"]
}

export function Pager({ current, total, href, ...props }: PagerProps) {
  const items = usePagination({
    current,
    total,
    href,
  })

  return (
    <nav role="navigation" aria-labelledby="pagination-heading" {...props}>
      <h4 className="sr-only">Pagination</h4>
      <ul className="flex items-center justify-center w-auto">
        {items.map((link, index) => (
          <li key={index}>
            {link.type === "previous" && (
              <Link href={link.href}
                className="flex items-center justify-center w-12 h-12 hover:text-blue-500">
                Prev
              </Link>
            )}
            {link.type === "page" && (
              <Link href={link.href}
                className={classNames("flex items-center justify-center w-12 h-12 hover:text-blue-500",
                  {
                    "text-gray-500": link.isCurrent,
                  }
                )}>
                {link.display}
              </Link>
            )}
            {link.type === "next" && (
              <Link href={link.href}
                className="flex items-center justify-center w-12 h-12 hover:text-blue-500">
                Next
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
