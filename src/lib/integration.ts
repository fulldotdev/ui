import type { AstroIntegration } from "astro"

import {
  syncArticles,
  syncBlogs,
  syncCollections,
  syncPolicies,
  syncProducts,
} from "../shopify/sync"
import { hasShopify } from "./has-shopify"

export default function fulldevIntegration(): AstroIntegration {
  return {
    name: "/integration",
    hooks: {
      "astro:config:setup": async () => {
        if (hasShopify()) {
          await syncCollections()
          await syncProducts()
          await syncBlogs()
          await syncArticles()
          await syncPolicies()
        }
      },
    },
  }
}
