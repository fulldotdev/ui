import { z } from "astro:schema"

import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    location: z.any(),
    salary: z.any(),
    hours: z.any(),
  })
  .partial()
  .strict()
