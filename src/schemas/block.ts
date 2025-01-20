import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { cardSchema } from 'fulldev-ui/schemas/card.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { formSchema } from 'fulldev-ui/schemas/form.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'
import { proofSchema } from 'fulldev-ui/schemas/proof.ts'

export const blockSchema = z
  .object({
    block: z.string().optional(),
    variant: z.number().optional(),
    align: z.enum(['start', 'center', 'end', 'sticky']).optional(),
    logo: logoSchema.optional(),
    socials: z.string().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
    tagline: z.string().optional(),
    heading: z.string().optional(),
    paragraph: z.string().optional(),
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
    cards: cardSchema.array().optional(),
    pros: cardSchema.optional(),
    cons: cardSchema.optional(),
    pages: pathSchema('pages').array().optional(),
    records: pathSchema('records').array().optional(),
    badge: badgeSchema.optional(),
    badges: badgeSchema.array().optional(),
    link: linkSchema.optional(),
    links: linkSchema.array().optional(),
    proof: proofSchema.optional(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
