import { z } from 'astro:content'
import { iconSchema } from './icon'

export const socialSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { href: data } : data),
  z
    .object({
      icon: iconSchema.optional(),
      text: z.string().optional(),
      href: z.string().optional(),
      target: z.literal('_blank').default('_blank').optional(),
      size: z.enum(['sm', 'md', 'lg']).default('sm').optional(),
      variant: z
        .enum(['primary', 'secondary', 'outline', 'ghost'])
        .default('secondary')
        .optional(),
    })
    .strict()
)

export type ButtonSchema = z.infer<typeof socialSchema>
