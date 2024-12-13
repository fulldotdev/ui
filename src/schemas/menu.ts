import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import Menu from 'fulldev-ui/components/Menu.astro'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'

export const menuSchema = z
  .object({
    heading: z.string().optional(),
    links: linkSchema.array().optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Menu>>
