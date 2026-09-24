import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, linkSchema } from "@/schemas/shared"

const nestedLinkSchema = linkSchema.extend({
  links: linkSchema.array().optional(),
})

export const globalSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string().trim().min(1),
    labels: z.object({
      copyMarkdown: z.string(),
      openIn: z.string(),
      openInMarkdown: z.string(),
      openInChatGPT: z.string(),
      openInClaude: z.string(),
      openInCursor: z.string(),
      toc: z.string(),
      pages: z.string(),
      pagination: z.object({
        previous: z.string(),
        next: z.string(),
        ariaLabel: z.string(),
      }),
    }),
    logo: z
      .object({
        label: z.string(),
        href: z.string(),
        src: image().optional(),
        srcLight: image().optional(),
        srcDark: image().optional(),
        alt: z.string(),
      })
      .refine((logo) => logo.src || (logo.srcLight && logo.srcDark), {
        message: "Logo must define src or both srcLight and srcDark.",
      }),
    header: z.object({
      navigation: nestedLinkSchema.array(),
      githubRepo: z.string(),
    }),
    sidebar: z.object({
      search: z.object({
        label: z.string(),
        empty: z.string(),
      }),
      navigation: nestedLinkSchema.array(),
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
