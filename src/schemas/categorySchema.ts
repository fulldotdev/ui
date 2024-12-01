import { z } from 'astro:content'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'
import pathSchema from 'fulldev-ui/schemas/utils/pathSchema.ts'

export const categorySchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    categories: pathSchema('categories').array().optional(),
    head: headSchema.optional(),
  })
  .strict()
  .nullable()

export type CategorySchema = z.infer<typeof categorySchema>
