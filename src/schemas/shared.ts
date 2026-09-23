import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const buttonSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  variant: z.enum(["default", "outline", "secondary", "ghost"]).optional(),
})

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string(),
  })

export const seoSchema = (ctx: SchemaContext) =>
  z
    .object({
      title: z.string().trim().min(1).optional(),
      description: z.string().trim().min(1).optional(),
      image: imageSchema(ctx).optional(),
      canonical: z.url().optional(),
      noindex: z.boolean().optional(),
      nofollow: z.boolean().optional(),
    })
    .strict()
