import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { headSchema } from 'fulldev-ui/schemas/head.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const pageSchema = blockSchema
  .extend({
    _layout: z.string().optional(),
    _schema: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    head: headSchema.optional(),
    banner: blockSchema.optional(),
    navigation: blockSchema.optional(),
    header: blockSchema.optional(),
    sections: blockSchema.array().optional(),
    subheader: blockSchema.array().optional(),
    sidebar: menuSchema.array().optional(),
    footer: blockSchema.optional(),
    categories: pathSchema('pages').array().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
