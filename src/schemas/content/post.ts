import { imageSchema } from "@/schemas/components/image"
import { pathSchema } from "@/schemas/misc/path"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "astro:content"

export const postSchema = z
  .object({
    type: z.literal("post").default("post"),
    variant: z.number().default(1),
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
  })
  .strict()
