import { z } from 'astro:content'

export const iconSchema = z
  .object({
    name: z.string().optional(),
  })
  .strict()

export type IconSchema = z.infer<typeof iconSchema>
