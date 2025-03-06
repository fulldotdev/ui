import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const articleSchema = z
  .object({
    type: z.literal("article").default("article"),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()
