import { type ObjectModel } from "@stackbit/types"

import { ButtonsField } from "../components/Buttons"
import { WriteupField } from "../components/Writeup"

export const CtaModel: ObjectModel = {
  name: "Cta",
  type: "object",
  fields: [WriteupField, ButtonsField],
}
