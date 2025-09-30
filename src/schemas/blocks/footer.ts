import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linksSchema } from "@/schemas/fields/links"

export const footerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    description: z.string(),
    links: linksSchema,
    socials: z.string().array(),
    logo: imageSchema,
    menus: z
      .object({
        text: z.string(),
        links: linksSchema,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export const footerProps = footerSchema

export type FooterSchema = z.infer<typeof footerSchema>
export type FooterProps = z.infer<typeof footerProps>
