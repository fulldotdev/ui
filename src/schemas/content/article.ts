import { imageSchema } from "@/schemas/components/image"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "zod"

import { sectionSchema } from "../components/section"

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
