import { DrupalNode } from "next-drupal"

// import { NodePage } from "components/node--page"
import { NodeNews } from "components/node--news"
// import { NodeLandingPage } from "components/node--landing-page"
// import { NodeProperty } from "components/node--property"

const nodeTypes = {
  // "node--page": NodePage,
  "node--news": NodeNews,
  //"node--landing_page": NodeLandingPage,
  //"node--property_listing": NodeProperty,
}

export interface NodeProps {
  node: DrupalNode
  viewMode?: string
}

export function Node({ node, viewMode = "full", ...props }: NodeProps) {

  //console.log(node, 'node.tsx')

  if (!node) {
    return null
  }

  const Component = nodeTypes[node.type]

  if (!Component) {
    return null
  }

  return <Component node={node} viewMode={viewMode} {...props} />
}
