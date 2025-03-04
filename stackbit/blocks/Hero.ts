import { type ObjectModel } from "@stackbit/types"

import { ButtonsField } from "../components/Buttons"
import { ImageField } from "../components/Image"
import { WriteupField } from "../components/Writeup"

export const HeroModel: ObjectModel = {
  name: "Hero",
  type: "object",
  fields: [WriteupField, ButtonsField, ImageField],
}
