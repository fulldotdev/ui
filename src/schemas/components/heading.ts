import { z } from 'astro:content'

export const headingSchema = z
  .object({
    text: z.string().optional(),
  })
  .strict()

export type HeadingSchema = z.infer<typeof headingSchema>
