import { z } from 'astro:content'

export const linkSchema = z
  .object({
    text: z.string().nullish(),
    href: z.string().nullish(),
  })
  .strict()

export type LinkSchema = z.infer<typeof linkSchema>
