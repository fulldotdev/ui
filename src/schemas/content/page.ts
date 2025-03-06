import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/components/section"
import { pathSchema } from "@/schemas/misc/path"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const pageSchema = z
  .object({
    type: z.literal("page").default("page"),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
    collections: pathSchema.array().optional(),
  })
  .strict()
