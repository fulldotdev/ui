import { z } from 'astro:content'
import { ctaSchema } from 'fulldev-ui/schemas//blocks/cta.ts'
import { featureSchema } from 'fulldev-ui/schemas//blocks/feature.ts'
import { heroSchema } from 'fulldev-ui/schemas//blocks/hero.ts'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const pageSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    head: headSchema.optional(),
    blocks: z.union([heroSchema, ctaSchema, featureSchema]).optional(),
  })
  .strict()
  .nullable()

export type PageSchema = z.infer<typeof pageSchema>
