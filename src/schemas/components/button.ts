import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    icon: z.string(),
    variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']),
    size: z.enum(['default', 'sm', 'lg']),
  })
  .partial()
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
