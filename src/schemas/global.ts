import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, linkSchema } from "@/schemas/shared"

export const globalSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    logo: z.object({
      light: image(),
      dark: image(),
    }),
    header: z.object({
      links: linkSchema.array(),
      buttons: buttonSchema.array(),
    }),
  })

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
