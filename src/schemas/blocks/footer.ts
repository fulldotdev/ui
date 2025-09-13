import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const footerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    links: linkSchema.array(),
    socials: z.string().array(),
    menus: z
      .object({
        text: z.string(),
        links: linkSchema.array(),
      })
      .array(),
  })
  .partial()
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>

export type FooterProps = Omit<FooterSchema, "variant">
