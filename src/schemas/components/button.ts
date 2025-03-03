import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    variant: z.enum(['default', 'outline', 'secondary', 'ghost', 'link']),
  })
  .partial()
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
