import siteConfig from "site.config"

import { stringify } from "qs"
import Jsona from "jsona"

const dataFormatter = new Jsona()

export function deserialize(body, options?) {
  if (!body) return null

  return dataFormatter.deserialize(body, options)
}

export function truncate(value: string, length: number, suffix = "...") {
  if (value.length < length) {
    return value
  }

  return value.slice(0, length) + suffix
}

export function absoluteURL(uri: string) {
  return `${siteConfig.drupalBaseUrl}${uri}`
}

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url)
}

// this is legacy...
export function buildUrl(
  path: string,
  params?: string | Record<string, string> | URLSearchParams
): URL {
  const url = new URL(
    path.charAt(0) === "/"
      ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${path}`
      : path
  )

  if (params) {
    // Use instead URLSearchParams for nested params.
    url.search = stringify(params)
  }

  return url
}

export async function getCustomDrupalView<T>(
  name: string,
  options?: {
    params
    deserialize?: boolean
    current: number
  }
): Promise<{
  results: T
  meta: Record<string, any>
  links: {
    [key in "next" | "prev" | "self"]?: {
      href: "string"
    }
  }
}> {
  options = {
    deserialize: true,
    ...options,
  }

  const [viewId, displayId] = name.split("--")

  const url = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/views/${viewId}/${displayId}/${options.params}`

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  // Use the Jsona to put the referenced fields together with the nodes.
  const results = options.deserialize ? deserialize(data) : data

  return {
    results,
    meta: data.meta,
    links: data.links,
  }
}

//--------------------------
// This is the Drupal Next one.
export async function getCustomDrupalViewBAK<T>(
  name: string,
  options?: {
    params
    deserialize?: boolean
    current: number
  }
): Promise<{
  results: T
  meta: Record<string, any>
  links: {
    [key in "next" | "prev" | "self"]?: {
      href: "string"
    }
  }
}> {
  options = {
    deserialize: true,
    ...options,
  }

  //console.log(options, 'util functions')

  const [viewId, displayId] = name.split("--")

  const url = buildUrl(
    `/jsonapi/views/${viewId}/${displayId}`,
    options.params
  )

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  const results = options.deserialize ? deserialize(data) : data

  return {
    results,
    meta: data.meta,
    links: data.links,
  }
}

