import { z } from "astro:schema"

import date from "@/schemas/elements/date"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    published: date,
    location: z.any(),
    salary: z.any(),
    hours: z.any(),
  })
  .partial()
  .strict()
