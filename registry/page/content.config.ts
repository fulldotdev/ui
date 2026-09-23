import { defineCollection, reference } from "astro:content"
import { z } from "astro/zod"

import { pageLoader } from "@/lib/page-loader"

const common = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  translationKey: z.string().trim().min(1).optional(),
  updatedAt: z.coerce.date().optional(),
  seo: z
    .object({
      title: z.string().trim().min(1).optional(),
      description: z.string().trim().min(1).optional(),
      canonical: z.url().optional(),
      noindex: z.boolean().optional(),
      nofollow: z.boolean().optional(),
    })
    .strict()
    .optional(),
})

export const collections = {
  pages: defineCollection({
    loader: pageLoader(),
    schema: z.discriminatedUnion("type", [
      common.extend({ type: z.literal("page") }).strict(),
      common
        .extend({
          type: z.literal("overview"),
          entries: z.array(reference("pages")).optional(),
        })
        .strict(),
    ]),
  }),
}
