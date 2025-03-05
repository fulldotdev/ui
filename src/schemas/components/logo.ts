import { z } from "astro:content"

export const logoSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    text: z.string(),
    href: z.string(),
  })
  .partial()
  .strict()

export type LogoSchema = z.infer<typeof logoSchema>
