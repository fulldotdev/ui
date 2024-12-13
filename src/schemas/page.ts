import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { headSchema } from 'fulldev-ui/schemas/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const pageSchema = z
  .object({
    _layout: z.string().default('Page').optional(),
    _schema: z.string().optional(),
    href: z.string().optional(),
    draft: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    order: z.number().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    head: headSchema.optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    banner: blockSchema.optional(),
    navigation: blockSchema.optional(),
    header: blockSchema.optional(),
    sections: blockSchema.array().optional(),
    subheader: blockSchema.array().optional(),
    sidebar: blockSchema.optional(),
    footer: blockSchema.optional(),
    parents: pathSchema('pages').array().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
