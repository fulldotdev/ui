import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const headerSchema = z
  .object({
    title: z.string(),
    links: linkSchema.array(),
    socials: z.string().array(),
    menus: z
      .object({
        text: z.string(),
        href: z.string(),
        links: linkSchema.array(),
      })
      .array(),
  })
  .partial()
  .strict()

export type HeaderProps = z.infer<typeof headerSchema>
