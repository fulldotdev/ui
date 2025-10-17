import { z } from "astro:schema"

import image from "@/schemas/ui/image"
import rating from "@/schemas/ui/rating"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    rating: rating,
    image: image,
  })
  .partial()
  .strict()
