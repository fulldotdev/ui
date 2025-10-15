import { z } from "astro:schema"

import person from "@/schemas/blocks/person"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    buttons: buttons,
    persons: z.union([z.string(), person.array()]),
  })
  .partial()
  .strict()
