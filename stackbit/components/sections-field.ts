import { type FieldList } from "@stackbit/types"

export const sectionsField: FieldList = {
  name: "sections",
  type: "list",
  items: {
    type: "reference",
    models: ["collection", "collections", "contact", "faqs", "hero"],
  },
}
