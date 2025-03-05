import { imageSchema } from "@/schemas/components/image"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "zod"

import { sectionSchema } from "../components/section"

export const collectionSchema = z
  .object({
    type: z.literal("collection").default("collection"),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()
