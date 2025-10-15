import { z } from "astro:schema"

import background from "@/schemas/elements/background"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    background: background,
    writeup: writeup,
    buttons: buttons,
  })
  .partial()
  .strict()
