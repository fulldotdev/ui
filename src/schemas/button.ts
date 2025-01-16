import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const buttonSchema = z
  .object({
    icon: z.string().optional(),
    image: imageSchema.optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    target: z.literal('_blank').optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
