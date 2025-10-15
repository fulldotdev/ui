import { z } from "astro:schema"

import job from "@/schemas/blocks/job"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    jobs: z.union([z.string(), job.array()]),
  })
  .partial()
  .strict()
