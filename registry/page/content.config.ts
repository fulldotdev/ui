import { defineCollection } from "astro:content"

import { pageSchema } from "@/schemas/page"
import { pageLoader } from "@/lib/page-loader"

export const collections = {
  pages: defineCollection({ loader: pageLoader(), schema: pageSchema }),
}
