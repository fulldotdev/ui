import { z } from 'astro:content'

export const labelSchema = z
  .object({
    text: z.string().optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    muted: z.boolean().optional(),
  })
  .strict()

export type LabelSchema = z.infer<typeof labelSchema>
