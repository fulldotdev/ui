import { z } from 'astro/zod'

export const pathSchema = z.string().transform((value) => {
  const path = value.split(`content`).pop()
  const slug = path?.split('/').pop()?.split('.').shift()
  return slug
})

export const buttonSchema = z
  .object({
    text: z.string(),
    html: z.string(),
    href: z.string(),
  })
  .partial()
  .passthrough()

const baseSchema = z
  .object({
    image: z.string(),
    images: z.string().array(),
    icon: z.string(),
    rating: z.number(),
    badge: z.string(),
    tagline: z.string(),
    heading: z.string(),
    text: z.string(),
    list: z.string().array(),
    price: z.string().or(z.number()),
    button: buttonSchema,
    buttons: buttonSchema.array(),
  })
  .partial()
  .passthrough()

export const blockSchema = baseSchema
  .extend({
    card: baseSchema,
    cards: baseSchema.array(),
  })
  .partial()
  .passthrough()

export const pageSchema = baseSchema
  .extend({
    title: z.string(),
    description: z.string(),
    head: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
      .partial(),
  })
  .partial()
  .passthrough()
