import { type FieldObject } from "@stackbit/types"

export const seoField: FieldObject = {
  name: "seo",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "canonical",
      type: "string",
    },
    {
      name: "noindex",
      type: "boolean",
    },
    {
      name: "nofollow",
      type: "boolean",
    },
  ],
}
