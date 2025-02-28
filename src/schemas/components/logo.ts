import { z } from 'astro:content'

export const logoSchema = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
  })
  .strict()

export type LogoSchema = z.infer<typeof logoSchema>
