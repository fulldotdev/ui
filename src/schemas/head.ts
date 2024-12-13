import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Head from 'fulldev-ui/components/Head.astro'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const headSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    theme: z.enum(['light', 'dark', 'system']).default('light').optional(),
    favicon: z.string().optional(),
    company: z.string().optional(),
    scripts: z.string().array().optional(),
    code: z.string().optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Head>>
