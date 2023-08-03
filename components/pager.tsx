import { usePagination, usePaginationProps } from "lib/use-pagination";
import { PagerItem } from "./pager-item";

export interface PagerProps extends React.HTMLAttributes<HTMLElement> {
  current: number;
  total: number;
  href: usePaginationProps["href"];
}

export function Pager({ current, total, href, ...props }: PagerProps) {
  const items = usePagination({
    current,
    total,
    href,
  });

  return (
    <nav role="navigation" aria-labelledby="pagination-heading" {...props}>
      <h4 className="sr-only">Pagination</h4>
      <ul className="inline-flex gap-x-3 text-sm">
        {items.map((link, index) => (
          <li key={index}>
            <PagerItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
