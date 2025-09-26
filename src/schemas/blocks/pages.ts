import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const pagesSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    pages: pathSchema.array(),
  })
  .partial()
  .strict()

export type PagesSchema = z.infer<typeof pagesSchema>
