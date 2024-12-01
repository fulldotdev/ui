import { z } from 'astro:content'

export const linkSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    icon: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
    variant: z
      .enum(['primary', 'underline', 'muted'])
      .default('primary')
      .optional(),
  })
  .strict()

export type LinkSchema = z.infer<typeof linkSchema>
