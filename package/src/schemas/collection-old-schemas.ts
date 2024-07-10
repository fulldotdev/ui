import type { ZodRawShape } from 'astro/zod'
import {
  reference,
  z,
  type AnyEntryMap,
  type ContentEntryMap,
  type DataEntryMap,
  type ValidContentEntrySlug,
} from 'astro:content'

export const pathSchema = <C extends keyof AnyEntryMap>(collection: C) =>
  z
    .string()
    .transform((value) => {
      const fullpath = value.split(`${collection}/`).pop()
      const slug = fullpath?.split('.').shift()
      return slug
    })
    .pipe(reference(collection))

const buttonSchema = z
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
  .passthrough()

const blockSchema = <R extends ZodRawShape>(references: R) =>
  baseSchema
    .extend({
      card: baseSchema,
      cards: baseSchema.array(),
    })
    .extend(references)
    .partial()
    .passthrough()

export const pageSchema = <R extends ZodRawShape>(references: R) =>
  baseSchema
    .extend({
      title: z.string(),
      description: z.string(),
      block: blockSchema(references),
      hero: blockSchema(references),
      cta: blockSchema(references),
      blocks: blockSchema(references).array(),
      main: z.object({}).catchall(blockSchema(references)).partial(),
      head: z
        .object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
        })
        .partial(),
    })
    .extend(references)
    .partial()
    .passthrough()

export type Reference<C extends keyof AnyEntryMap> =
  C extends keyof ContentEntryMap
    ? {
        collection: C
        slug: ValidContentEntrySlug<C>
      }
    : C extends keyof DataEntryMap
      ? {
          collection: C
          id: keyof DataEntryMap[C]
        }
      : never
