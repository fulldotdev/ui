import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

export const linkSchema = z.object({
  text: z.string(),
  href: z.string(),
})

export const buttonSchema = z.object({
  text: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  variant: z
    .enum(["default", "outline", "secondary", "ghost", "link"])
    .optional(),
})

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string(),
  })

export const seoSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    image: imageSchema(ctx).optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
    nofollow: z.boolean().optional(),
  })

export const baseSeoLayoutSchema = (ctx: SchemaContext) =>
  z.object({
    seo: seoSchema(ctx).optional(),
  })

export type SeoSchema = z.infer<ReturnType<typeof seoSchema>>
export type BaseSeoLayoutSchema = z.infer<
  ReturnType<typeof baseSeoLayoutSchema>
>
export type LinkSchema = z.infer<typeof linkSchema>
export type ButtonSchema = z.infer<typeof buttonSchema>
