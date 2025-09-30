import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linksSchema } from "@/schemas/fields/links"

export const headerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    links: linksSchema,
    socials: z.string().array(),
    logo: imageSchema,
    menus: z
      .object({
        text: z.string(),
        href: z.string(),
        links: linksSchema,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export const headerProps = headerSchema

export type HeaderSchema = z.infer<typeof headerSchema>
export type HeaderProps = z.infer<typeof headerProps>
