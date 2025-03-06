import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const postSchema = z
  .object({
    type: z.literal("post").default("post"),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    // author
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()
