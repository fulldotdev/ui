import { z } from 'astro:content'

export const buttonSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z
      .enum(['primary', 'secondary', 'outline', 'ghost'])
      .default('primary')
      .optional(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
