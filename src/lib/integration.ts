import type { AstroIntegration } from "astro"

import config from "../data/config.json"
import { syncCollections, syncProducts } from "../shopify/sync"

export default function fulldevIntegration(): AstroIntegration {
  return {
    name: "/integration",
    hooks: {
      "astro:config:setup": async () => {
        if (
          "shopify" in config &&
          "storeDomain" in config.shopify &&
          "publicAccessToken" in config.shopify
        ) {
          syncCollections()
          syncProducts()
        }
      },
    },
  }
}
