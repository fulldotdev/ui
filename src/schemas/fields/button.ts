import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    variant: z.enum(['default', 'secondary', 'outline', 'ghost']).optional(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
