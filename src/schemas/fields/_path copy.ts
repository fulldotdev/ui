import { reference, z, type CollectionKey } from "astro:content"

export const pathSchema = <T extends CollectionKey = CollectionKey>(
  collection: T
) =>
  z.preprocess((value) => {
    if (typeof value === "string") {
      const folder = value.split(`/${collection}/`)[0]
      const path = folder.replace(`${folder}/${collection}/`, "")
      const slug = path.split(".")[0]
      const id = slug?.replace("/index", "")
      return id
    }
    return value
  }, reference(collection))
