import { imageSchema } from "@/schemas/components/image"
import { sectionSchema } from "@/schemas/components/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "zod"

export const pageSchema = z
  .object({
    type: z.enum(["page", "home"]).default("page"),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()
