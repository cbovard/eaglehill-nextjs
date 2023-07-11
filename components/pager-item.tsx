import Link from "next/link"

export function PagerItem({ link }) {
  if (link.type === "previous") {
    return (
      <Link href={link.href}
        className="flex items-center justify-center w-12 h-12 hover:text-blue-500">
        Prev
      </Link>
    )
  }

  if (link.type === "page") {
    // No link if this is the current page.
    if (link.isCurrent) {
      return (
        <span className="flex items-center justify-center w-12 h-12 text-gray-500 font-bold">
          {link.display}
        </span>
      )
    } else {
      return (
        <Link href={link.href}
          className="flex items-center justify-center w-12 h-12 hover:text-blue-500">
          {link.display}
        </Link>
      )
    }
  }

  if (link.type === "next") {
    return (
      <Link href={link.href}
        className="flex items-center justify-center w-12 h-12 hover:text-blue-500">
        Next
      </Link>
    )
  }

  // If nothing then nothing.
  return null
}