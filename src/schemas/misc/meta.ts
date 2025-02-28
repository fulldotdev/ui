import { z } from 'astro:content'

export const metaSchema = z
  .object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    canonical: z.string().nullish(),
    noindex: z.boolean().nullish(),
    nofollow: z.boolean().nullish(),
    css: z.string().nullish(),
    head: z.string().nullish(),
    body: z.string().nullish(),
    class: z.string().nullish(),
    lang: z.string().nullish(),
  })
  .strict()
