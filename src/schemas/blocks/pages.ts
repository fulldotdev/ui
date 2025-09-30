import { z } from "astro:schema"

import { contentProps } from "@/schemas/blocks/content"
import { linksSchema } from "@/schemas/fields/links"
import { referencesProps, referencesSchema } from "@/schemas/fields/references"

export const pagesSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    pages: referencesSchema,
  })
  .partial()
  .strict()

export const pagesProps = pagesSchema.extend({
  pages: referencesProps.pipe(contentProps.array()),
})

export type PagesSchema = z.infer<typeof pagesSchema>
export type PagesProps = z.infer<typeof pagesProps>
