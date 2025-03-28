import type { AstroIntegration } from "astro"

import { syncCollections, syncProducts } from "../shopify/sync"
import { hasShopify } from "./has-shopify"

export default function fulldevIntegration(): AstroIntegration {
  return {
    name: "/integration",
    hooks: {
      "astro:config:setup": async () => {
        if (hasShopify()) {
          syncCollections()
          syncProducts()
        }
      },
    },
  }
}
