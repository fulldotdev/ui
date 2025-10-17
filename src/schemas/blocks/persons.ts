import { z } from "astro:schema"

import person from "@/schemas/blocks/person"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    persons: z.union([z.string().array(), person.array()]),
  })
  .partial()
  .strict()
