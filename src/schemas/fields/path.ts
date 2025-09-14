import { reference, z } from "astro:content"

export const pathSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    const folder = value.split("/pages/")[0]
    const path = folder.replace(`${folder}/pages/`, "")
    const slug = path.split(".")[0]
    const id = slug?.replace("/index", "")
    return id
  }
  return value
}, reference("pages"))
