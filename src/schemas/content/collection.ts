import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const collectionSchema = z
  .object({
    type: z.literal("collection").default("collection"),
    variant: z.number().default(1),
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
  })
  .strict()
