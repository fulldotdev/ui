import { z } from 'astro:content'

export const logoSchema = z
  .object({
    src: z.string().nullish(),
    alt: z.string().nullish(),
    text: z.string().nullish(),
    href: z.string().nullish(),
  })
  .strict()

export type LogoSchema = z.infer<typeof logoSchema>
