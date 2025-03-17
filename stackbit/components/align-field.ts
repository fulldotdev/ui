import { type FieldEnum } from "@stackbit/types"

export const alignField: FieldEnum = {
  name: "align",
  type: "enum",
  options: [
    { label: "Start", value: "start" },
    { label: "Center", value: "center" },
    { label: "End", value: "end" },
  ],
  default: "center",
  group: "settings",
}
