import {
  reference,
  z,
  type AnyEntryMap,
  type ContentEntryMap,
  type DataEntryMap,
  type ValidContentEntrySlug,
} from 'astro:content'

export const path = <C extends keyof AnyEntryMap>(collection: C) =>
  z
    .string()
    .transform((value) => {
      const fullpath = value.split(`${collection}/`).pop()
      const slug = fullpath?.split('.').shift()
      return slug
    })
    .pipe(reference(collection))

export type Reference<C extends keyof AnyEntryMap> =
  C extends keyof ContentEntryMap
    ? {
        collection: C
        slug: ValidContentEntrySlug<C>
      }
    : C extends keyof DataEntryMap
      ? {
          collection: C
          id: keyof DataEntryMap[C]
        }
      : never
