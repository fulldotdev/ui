import { z } from 'astro:content'

export const checkboxSchema = z
  .object({
    name: z.string().optional(),
    label: z.string().optional(),
    id: z.string().optional(),
    value: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type CheckboxSchema = z.infer<typeof checkboxSchema>
