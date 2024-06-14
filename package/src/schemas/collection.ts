import { z } from 'astro:content'

export const headSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  })
  .partial()

const buttonSchema = z
  .object({
    text: z.string(),
    html: z.string(),
    href: z.string(),
    variant: z.string(),
  })
  .partial()

export const cardSchema = z
  .object({
    image: z.string(),
    images: z.string().array(),
    rating: z.number(),
    badge: z.string(),
    tagline: z.string(),
    heading: z.string(),
    paragraph: z.string(),
    list: z.string().array(),
    price: z.string().or(z.number()),
    button: buttonSchema,
    buttons: buttonSchema.array(),
  })
  .partial()

export const blockSchema = z
  .object({
    rating: z.number(),
    badge: z.string(),
    tagline: z.string(),
    heading: z.string(),
    paragraph: z.string(),
    list: z.string().array(),
    price: z.string().or(z.number()),
    button: buttonSchema,
    buttons: buttonSchema.array(),
    image: z.string(),
    images: z.string().array(),
    card: cardSchema,
    cards: cardSchema.array(),
  })
  .partial()

export const pageSchema = z
  .object({
    head: headSchema,
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    list: z.string(),
    image: z.string(),
    images: z.string().array(),
    rating: z.number(),
    badge: z.string(),
    price: z.string().or(z.number()),
  })
  .partial()
  .passthrough()
