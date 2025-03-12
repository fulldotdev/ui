import type { FieldList } from "@stackbit/types"

export const buttonsField: FieldList = {
  name: "buttons",
  type: "list",
  items: {
    type: "object",
    fields: [
      { name: "text", type: "string" },
      { name: "href", type: "string" },
    ],
  },
}
