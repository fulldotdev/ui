import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linksSchema } from "@/schemas/fields/links"

export const contentSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    image: imageSchema,
  })
  .partial()
  .strict()

export const contentProps = contentSchema

export type ContentSchema = z.infer<typeof contentSchema>
export type ContentProps = z.infer<typeof contentProps>
