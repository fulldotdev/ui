import { z } from "astro:schema"

import background from "@/schemas/elements/background"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    background: background,
    title: z.string(),
    description: z.string(),
  })
  .partial()
  .strict()
