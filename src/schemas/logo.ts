import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import Logo from 'fulldev-ui/components/Logo.astro'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const logoSchema = z
  .object({
    image: imageSchema.optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Logo>>
