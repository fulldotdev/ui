import { type FieldObject } from "@stackbit/types"

export const imageField: FieldObject = {
  name: "image",
  label: "Afbeelding",
  type: "object",
  fields: [
    {
      name: "src",
      label: "Upload",
      type: "image",
      required: true,
    },
    {
      name: "alt",
      label: "Omschrijving",
      type: "string",
      required: true,
    },
  ],
}
