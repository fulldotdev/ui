import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { linkSchema } from "@/schemas/shared"

export const globalSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    logo: z
      .object({
        label: z.string(),
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
      githubRepo: z.string(),
    }),
    sidebar: z.object({
      search: z.object({
        label: z.string(),
        empty: z.string(),
      }),
    }),
    docs: z
      .object({
        callout: z.object({
          description: z.string(),
          button: linkSchema,
        }),
      })
      .optional(),
  })

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
