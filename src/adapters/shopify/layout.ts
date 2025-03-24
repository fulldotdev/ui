import type { LayoutSchema } from "@/schemas/layout"
import { z } from "zod"

import { transformImage, transformMediaImage } from "@/lib/shopify/transforms"

import { shopifyButtonsTransform, shopifyImageTransform } from "./transforms"

export const LAYOUT_QUERY = `#graphql
  query {
    metaobject(handle: {type: "layout", handle: "base" }) {
      fields {
        key
        value
        references(first: 50) {
          nodes {
            ... on Metaobject {
              fields {
                key
                value
              }
            }
          }
        }
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`

export const shopifyImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
})

export const shopifyLayoutSchema = z.object({
  fields: z
    .object({
      key: z.string(),
      value: z.string(),
      reference: z
        .object({
          image: shopifyImageSchema,
        })
        .nullable(),
      references: z
        .object({
          nodes: z
            .object({
              fields: z
                .object({
                  key: z.string(),
                  value: z.string(),
                })
                .array(),
            })
            .array(),
        })
        .nullable(),
    })
    .array(),
})

function getField(
  fields: z.infer<typeof shopifyLayoutSchema>["fields"],
  key: string
) {
  return fields.find((field) => field.key === key)
}

export function shopifyLayoutTransform(
  layout: z.infer<typeof shopifyLayoutSchema>
): LayoutSchema {
  return {
    lang: getField(layout.fields, "language")?.value,
    company: getField(layout.fields, "company")?.value,
    logo: shopifyImageTransform(
      getField(layout.fields, "logo")?.reference?.image
    ),
    banner: {
      variant: 1,
      list: JSON.parse(getField(layout.fields, "banner")?.value ?? "[]"),
    },
    // header: {
    //   variant: 1,
    //   list: JSON.parse(
    //     getField(layout.fields, "header")?.references?.nodes.map((node) => ({}))
    //   ),
    // },
    // footer: {
    //   variant: 1,
    //   list: JSON.parse(getField(layout.fields, "footer")?.value ?? "[]"),
    // },
  }
}
