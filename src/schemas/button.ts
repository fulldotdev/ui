import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    icon: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    reverse: z.boolean().optional(),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
