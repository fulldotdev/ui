import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import rating from "@/schemas/elements/rating"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    rating: rating,
    image: image,
  })
  .partial()
  .strict()
