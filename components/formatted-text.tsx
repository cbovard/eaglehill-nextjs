import { HTMLReactParserOptions, domToReact } from "html-react-parser"
import { Element } from "domhandler"
import parse from "html-react-parser"
import Image from "next/image"
import Link from "next/link"

import { isRelative } from "lib/utils"

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === "img") {
        const {
          src,
          alt,
          class: className,
          width,
          height,
        } = domNode.attribs

        // TODO - Going to need to fix the height and width for inline images.
        // https://nextjs.org/docs/pages/api-reference/components/image

        if (isRelative(src)) {
          return (
            <div className={className}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${src}`}
                width={100}
                height={100}
                alt={alt}
              />
            </div>
          )
        }
      }

      if (domNode.name === "a") {
        const { href, class: className } = domNode.attribs

        if (href && isRelative(href)) {
          return (
            <Link href={href} passHref>
              <a className={className}>{domToReact(domNode.children)}</a>
            </Link>
          )
        }
      }
    }
  },
}

interface FormattedTextProps {
  text?: string
  maxLength?: number
}

export function FormattedText({ text }: FormattedTextProps) {
  if (!text) return null

  return <>{parse(text, options)}</>
}

// Todo - This needs some serious work. Can use the CSS instead maybe?
// https://www.w3schools.com/cssref/css3_pr_text-overflow.php
export function TeaserText({ text, maxLength }: FormattedTextProps) {
  if (!text) return null

  // If there is no maxLength for the body.
  // todo add this to teasers if needed.
  const textLength = maxLength ? maxLength : 200

  // Stupid amps.
  text = text.replace(/&amp;/g, "&")
  const strippedString = text.replace(/(<([^>]+)>)/gi, "");
  const strippedTruncatedString = strippedString.substring(0, textLength) + '...';

  return <>{strippedTruncatedString}</>
}


