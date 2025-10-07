import { z } from "astro:schema"

import job from "@/schemas/blocks/job"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    links: links,
    jobs: z.union([z.string(), job.array()]),
  })
  .partial()
  .strict()
