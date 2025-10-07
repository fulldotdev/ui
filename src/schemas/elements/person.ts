import { z } from "astro:schema"

import image from "@/schemas/elements/image"

export default z
  .object({
    image,
    title: z.string(),
    tagline: z.string(),
  })
  .partial()
  .strict()
