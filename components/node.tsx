import { DrupalNode } from "next-drupal"

import { NodePage } from "components/node--page"
import { NodeNews } from "components/node--news"
import { NodeLivestock } from "components/node--livestock"

const nodeTypes = {
  "node--page": NodePage,
  "node--news": NodeNews,
  "node--livestock": NodeLivestock,
}

export interface NodeProps {
  node: DrupalNode
  viewMode?: string
}

export function Node({ node, viewMode = "full", ...props }: NodeProps) {

  if (!node) {
    return null
  }

  const Component = nodeTypes[node.type]

  if (!Component) {
    return null
  }

  return <Component node={node} viewMode={viewMode} {...props} />
}
