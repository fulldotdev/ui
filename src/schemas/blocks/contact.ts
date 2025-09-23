import { z } from "astro:schema"

import { formSchema } from "@/schemas/fields/form"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const contactSchema = z
  .object({
    variant: z.enum(["1", "2", "3"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    channels: linkSchema.array(),
    socials: z.string().array(),
    image: imageSchema,
    form: formSchema,
  })
  .partial()
  .strict()

export type ContactSchema = z.infer<typeof contactSchema>
