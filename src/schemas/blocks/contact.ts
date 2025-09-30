import { z } from "astro:schema"

import { formSchema } from "@/schemas/fields/form"
import { imageSchema } from "@/schemas/fields/image"
import { linksSchema } from "@/schemas/fields/links"

export const contactSchema = z
  .object({
    variant: z.enum(["1", "2", "3"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    channels: linksSchema,
    socials: z.string().array(),
    image: imageSchema,
    form: formSchema,
  })
  .partial()
  .strict()

export const contactProps = contactSchema

export type ContactSchema = z.infer<typeof contactSchema>
export type ContactProps = z.infer<typeof contactProps>
