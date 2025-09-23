import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"

export const personSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    email: z.string().email(),
    phone: z.number(),
    address: z.string(),
    socials: z.string().array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type PersonSchema = z.infer<typeof personSchema>
