import { reference, z } from "astro:content"

import { blockSchema } from "@/schemas/block"
import { pathSchema } from "@/schemas/fields/path"

export const pageSchema = blockSchema
  .extend({
    type: z.enum([
      "page",
      "collection",
      "post",
      "location",
      "person",
      "event",
      "blog",
      "product",
    ]),
    variant: z.number(),
    layout: pathSchema.pipe(reference("layouts")),
    pages: pathSchema.pipe(reference("pages")).array(),
    sections: pathSchema.pipe(reference("sections")).array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial(),
  })
  .partial()
