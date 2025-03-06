import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const locationSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
  })
  .strict()
