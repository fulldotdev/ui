import { reference, z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/fields/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/fields/button.ts'
import { cardSchema } from 'fulldev-ui/schemas/fields/card.ts'
import { channelSchema } from 'fulldev-ui/schemas/fields/channel.ts'
import { formSchema } from 'fulldev-ui/schemas/fields/form.ts'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'
import { linkSchema } from 'fulldev-ui/schemas/fields/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/fields/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/fields/menu.ts'
import { proofSchema } from 'fulldev-ui/schemas/fields/proof.ts'

export const blockSchema = z
  .object({
    block: z.string().optional(),
    align: z.enum(['start', 'center', 'end']).optional(),
    size: z.enum(['sm', 'md', 'lg']).optional(),
    depth: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    logo: logoSchema.optional(),
    socials: z.string().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tagline: z.string().optional(),
    heading: z.string().optional(),
    paragraph: z.string().optional(),
    content: z.string().optional(),
    list: z.string().array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: reference('categories').array().optional(),
    products: reference('products').array().optional(),
    posts: reference('posts').array().optional(),
    pages: reference('pages').array().optional(),
    jobs: reference('jobs').array().optional(),
    docs: reference('docs').array().optional(),
    form: formSchema.optional(),
    cards: cardSchema.array().optional(),
    pros: cardSchema.optional(),
    cons: cardSchema.optional(),
    badge: badgeSchema.optional(),
    badges: badgeSchema.array().optional(),
    link: linkSchema.optional(),
    links: linkSchema.array().optional(),
    proof: proofSchema.optional(),
    search: z.boolean().optional(),
    themer: z.boolean().optional(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
