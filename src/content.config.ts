import { bannerSchema } from "@/schemas/blocks/banner"
import { collectionSchema } from "@/schemas/blocks/collection"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { locationSchema } from "@/schemas/blocks/location"
import { personSchema } from "@/schemas/blocks/person"
import { postSchema } from "@/schemas/blocks/post"
import { productSchema } from "@/schemas/blocks/product"
import { reviewSchema } from "@/schemas/blocks/review"
import { pageSchema } from "@/schemas/misc/page"
import { pathSchema } from "@/schemas/misc/path"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: pageSchema,
  }),
  reviews: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/reviews`,
    }),
    schema: reviewSchema,
  }),
  layouts: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{json,yml,yaml}",
      base: `./src/content/layouts`,
    }),
    schema: z.object({
      lang: z.string(),
      company: z.string(),
      banner: bannerSchema
        .extend({
          variant: z.number().default(1),
        })
        .optional(),
      header: headerSchema
        .extend({
          variant: z.number().default(1),
        })
        .optional(),
      footer: footerSchema
        .extend({
          variant: z.number().default(1),
        })
        .optional(),
      sections: sectionSchema.array().optional(),
    }),
  }),
}
