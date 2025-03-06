import { getEntry, z, type AnyEntryMap } from "astro:content"

export const pathSchema = z
  .string()
  .transform(async (value) => {
    const collection = value?.split("/").shift() as
      | keyof AnyEntryMap
      | undefined
    const id = value?.split("/").slice(1).join("/").split(".").shift() as
      | string
      | undefined
    const ref = {
      collection,
      id,
    }
    console.log({ ref })
    return ref
  })
  .refine(
    async ({ collection, id }) => {
      const entry =
        collection && id ? await getEntry(collection, id) : undefined
      return entry ? true : false
    },
    (value) => ({
      message: `Entry "${value.id}" in "${value.collection}" not found`,
    })
  )
