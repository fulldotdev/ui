import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"

export const headerSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    links: linkSchema.array(),
    socials: z.string().array(),
    logo: imageSchema,
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

export type HeaderSchema = z.infer<typeof headerSchema>
