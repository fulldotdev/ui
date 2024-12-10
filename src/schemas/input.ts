import { z } from 'astro:content'
import { iconSchema } from 'fulldev-ui/schemas/icon.ts'

export const inputSchema = z
  .object({
    icon: iconSchema.shape.name,
    name: z.string().optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    id: z.string().optional(),
    value: z.string().optional(),
    type: z.enum(['text', 'email', 'tel', 'url']).default('text').optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type InputSchema = z.infer<typeof inputSchema>
