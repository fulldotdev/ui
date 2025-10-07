import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import socials from "@/schemas/elements/socials"

export default z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.number(),
    address: z.string(),
    socials: socials,
    image: image,
  })
  .partial()
  .strict()
