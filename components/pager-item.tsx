import Link from "next/link";

export function PagerItem({ link }) {
  // todo - clean this up and put it into use-pagination.tsx.
  if (link.type === "previous") {
    return (
      <Link
        href={link.href}
        className="ml-0 flex h-8 items-center justify-center rounded-lg border border-deep-fir-700
        px-3 leading-tight text-white transition-all duration-200 hover:border-gray-700 hover:text-deep-fir-400"
      >
        Prev
      </Link>
    );
  }

  if (link.type === "page") {
    // No link if this is the current page.
    if (link.isCurrent) {
      return (
        <span
          className="flex h-8 items-center justify-center rounded-lg border border-gray-700
        px-3 leading-tight text-deep-fir-400"
        >
          {link.display}
        </span>
      );
    } else {
      return (
        <Link
          href={link.href}
          className="flex h-8 items-center justify-center rounded-lg border border-deep-fir-700
          px-3 leading-tight text-white transition-all duration-200 hover:border-gray-700 hover:text-deep-fir-400"
        >
          {link.display}
        </Link>
      );
    }
  }

  if (link.type === "next") {
    return (
      <Link
        href={link.href}
        className="flex h-8 items-center justify-center rounded-lg border border-deep-fir-700
        px-3 leading-tight text-white transition-all duration-200 hover:border-gray-700 hover:text-deep-fir-400"
      >
        Next
      </Link>
    );
  }
  return null;
}
