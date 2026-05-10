import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, linkSchema } from "@/schemas/shared"

const nestedLinkSchema = linkSchema.extend({
  links: linkSchema.array().optional(),
})

export const globalSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    logo: z
      .object({
        text: z.string(),
        href: z.string(),
        src: image().optional(),
        srcLight: image().optional(),
        srcDark: image().optional(),
        alt: z.string().optional(),
      })
      .refine((logo) => logo.src || (logo.srcLight && logo.srcDark), {
        message: "Logo must define src or both srcLight and srcDark.",
      }),
    header: z.object({
      links: nestedLinkSchema.array(),
      buttons: buttonSchema.array(),
    }),
    sidebar: z.object({
      links: nestedLinkSchema.array(),
    }),
    docs: z
      .object({
        callout: z.object({
          description: z.string(),
          button: buttonSchema,
        }),
      })
      .optional(),
  })

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
