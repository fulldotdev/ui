import { z } from "astro:schema"

import background from "@/schemas/ui/background"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    background: background,
    title: z.string(),
    description: z.string(),
  })
  .partial()
  .strict()
