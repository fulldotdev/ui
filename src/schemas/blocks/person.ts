import { z } from "astro:schema"

import { address } from "@/schemas/fields/address"
import { description } from "@/schemas/fields/description"
import { email } from "@/schemas/fields/email"
import { image } from "@/schemas/fields/image"
import { socials } from "@/schemas/fields/socials"
import { tagline } from "@/schemas/fields/tagline"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const person = z
  .object({
    variant,
    tagline,
    title,
    description,
    email,
    phone: z.number(),
    address,
    socials,
    image,
  })
  .partial()
  .strict()
