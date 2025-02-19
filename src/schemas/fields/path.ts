import { reference, z, type AnyEntryMap } from 'astro:content'

// TODO: preprocess instead
export const pathSchema = <C extends keyof AnyEntryMap>(collection: C) =>
  z
    .string()
    .transform((value) => {
      const fullpath = value?.split(`${collection}/`).pop()
      const slug = fullpath?.split('.').shift()
      const noIndexEnding = slug?.replace('/index', '')
      return noIndexEnding
    })
    .pipe(reference(collection))
