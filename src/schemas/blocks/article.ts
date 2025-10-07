import { z } from "astro:schema"

import person from "@/schemas/blocks/person"
import date from "@/schemas/elements/date"
import image from "@/schemas/elements/image"
import prose from "@/schemas/elements/prose"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    image: image,
    published: date,
    person: z.union([z.string(), person]),
  })
  .partial()
  .strict()
