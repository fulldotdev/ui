import { z } from "astro:schema"

import background from "@/schemas/ui/background"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    background: background,
    html: html,
    buttons: button.array(),
  })
  .partial()
  .strict()
