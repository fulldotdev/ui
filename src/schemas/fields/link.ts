import { z } from "astro:schema"

export const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.enum(["default", "outline", "secondary"]),
    target: z.string(),
  })
  .partial()
  .strict()
