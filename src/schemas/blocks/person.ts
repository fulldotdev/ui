import { z } from "astro:schema"

import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.number(),
    address: z.string(),
    socials: z.string().array(),
    image: image,
  })
  .partial()
  .strict()
