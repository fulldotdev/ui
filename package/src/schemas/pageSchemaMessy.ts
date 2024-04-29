import { getCollection, getEntry, type CollectionKey } from 'astro:content'
import { flatten, unflatten } from 'flat'
import { camel, crush, get, mapKeys, mapValues, objectify } from 'radash'
import { z } from 'zod'

interface Options {
  casing: boolean
  underscores: boolean
  templates: boolean
  queries: boolean
}

const defaults: Options = {
  casing: true,
  underscores: true,
  templates: true,
  queries: true,
}

const replaceUnderscores = (data: any) =>
  unflatten(
    flatten(data, {
      transformKey: (key: any) => {
        if (/^_+$/.test(key)) return '$template$' // if only underscores
        return key.replace(/^_+/, '') // if leading underscores
      },
    })
  )

const replaceCasing = (data: any) =>
  unflatten(flatten(data, { transformKey: (key: any) => camel(key) }))

const replaceQueries = async (data: any) => {
  const crushed = crush(data)
  const values = Object.values(crushed)
  const strings = values.filter((v) => typeof v === 'string')
  const string: any = strings.join(' ')
  const references = string.match(/\$[^.]*?(\s|\.|$)/g) || []
  const stripped = references?.map((q: string) =>
    q.replace('$', '').replace(' ', '').replace('.', '')
  )

  const promises = stripped
    .map((ref: string) => {
      const parts = ref.split('/')
      const collection = (parts[0] as CollectionKey | 'self') || undefined
      const slug = parts.slice(1).join('/') || undefined

      if (collection == 'self') return
      if (collection && slug) return getEntry(collection, slug)
      else if (collection) return getCollection(collection)
    })
    .filter(Boolean)

  const responses = await Promise.all(promises)

  const cascade = {
    self: data,
    ...objectify(
      responses,
      (r) =>
        Array.isArray(r) ? r[0]?.collection : `${r?.collection}/${r.slug}`,
      (r) => (Array.isArray(r) ? r.map((e) => e.data) : r.data)
    ),
  }

  const mapped = mapValues(crushed, (value: string) => {
    if (typeof value !== 'string') return value
    const regex = /\$[^ ]+(?=\s|$)/g
    const queries = string.match(regex) || []
    const surrounding = value.replace(regex, '').replace(' ', '')

    if (queries?.length == 0) return value
    if (queries?.length == 1 && surrounding?.length == 0) {
      const path = queries[0].replace('$', '')
      const found = get(cascade, path)
      return found ?? value
    }

    return (value as string).replace(/\$[^\s]+/g, (query: any) => {
      const path = query.replace('$', '')
      const found = get(cascade, path)
      return found ?? query
    })
  })

  const constructed: any = unflatten(mapped)
  return constructed
}

const replaceTemplates = (data: any) => {
  const crushed: any = crush(data)
  const replaced = mapKeys(
    crushed,
    (key: any) =>
      key
        .replace(/\$template\$/g, '') // Remove all instances of $template$
        .replace(/\.\.+/, '.') // Replace multiple dots with a single dot
        .replace(/^\./, '') // Remove leading dot, if any
        .replace(/\.$/, '') // Remove trailing dot, if any
  )
  const nested = unflatten(replaced)
  return nested
}

export const pageSchemaMessy = (options: Partial<Options> = {}) =>
  z
    .object({
      layout: z.string().optional(),
    })
    .passthrough()
    .transform(async (data: any) => {
      const { casing, underscores, templates, queries } = {
        ...defaults,
        ...options,
      }
      if (underscores) data = replaceUnderscores(data)
      if (casing) data = replaceCasing(data)
      if (queries) data = await replaceQueries(data)
      // TODO replace nulls so that they don't overwrite templates. Or have other values have always priority over nulls
      if (templates) data = replaceTemplates(data)
      // TODO remove falses, so that you can disable template values
      return data
    })
