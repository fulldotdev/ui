import { z } from "astro:schema"

import { formSchema } from "@/schemas/fields/form"
import { imageSchema } from "@/schemas/fields/image"

export const contactSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    email: z.string().email(),
    phone: z.number(),
    address: z.string(),
    socials: z.string().array(),
    image: imageSchema,
    form: formSchema,
  })
  .partial()
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
