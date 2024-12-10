import { z } from 'astro:content'

export const headingSchema = z
  .object({
    text: z.string().optional(),
    size: z
      .enum(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'])
      .default('md')
      .optional(),
    muted: z.boolean().optional(),
  })
  .strict()

export type HeadingSchema = z.infer<typeof headingSchema>
