import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { formSchema } from 'fulldev-ui/schemas/form.ts'
import { headSchema } from 'fulldev-ui/schemas/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const pageSchema = z
  .object({
    // Config
    _schema: z.string().optional(),
    block: z.string().optional(),
    variant: z.number().optional(),
    slug: z.string().optional(),
    // Globals
    logo: logoSchema.optional(),
    socials: z.string().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
    // Block
    tagline: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: pathSchema('pages').array().optional(),
    form: formSchema.optional(),
    // Page
    head: headSchema.optional(),
    header: blockSchema.optional(),
    sections: blockSchema.array().optional(),
    footer: blockSchema.optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
