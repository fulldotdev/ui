import { z } from "astro:schema"

import person from "@/schemas/blocks/person"
import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    image: image,
    person: z.union([z.string(), person]),
  })
  .partial()
  .strict()
