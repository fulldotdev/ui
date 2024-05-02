import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content'
import { flatten, unflatten } from 'flat'
import { all, camel, get, isString, mapValues } from 'radash'
import { mapKeys, merge } from 'remeda'
import { z } from 'zod'

interface Options {
  casing: boolean
  underscores: boolean
  references: boolean
  selfs: boolean
}

const defaults: Options = {
  casing: true,
  underscores: true,
  references: true,
  selfs: true,
}

const mapKeyParts = (object: object, callback: Function) => {
  const flat = flatten(object)
  const mapped = mapKeys(flat, (key) => {
    if (!isString(key)) return key
    const parts = (key as string).split('.')
    const result = parts.map((part) => callback(part))
    return result.join('.')
  })
  return unflatten(mapped)
}

const mapValueParts = (object: object, callback: Function) => {
  const flat = flatten(object) as any
  const mapped = mapValues(flat, (value) => {
    if (!isString(value)) return value
    const parts = (value as string).split(' ')
    const result = parts.map((part) => callback(part))
    return result.join(' ')
  })
  return unflatten(mapped)
}

const replaceUnderscores = (data: object) =>
  mapKeyParts(data, (part: string) => {
    return part.replace(/^_+/, '')
  })

const replaceCasing = (data: object) =>
  mapKeyParts(data, (part: string) => camel(part))

const replaceSelfs = (data: object) =>
  mapValueParts(data, (part: string) => {
    if (!part.startsWith('$self')) return part

    const pathParts = part.split('.').slice(1)
    const camelCased = pathParts.map((part) => camel(part))
    const path = camelCased.join('.')
    const result = get(data, path)
    return result
  })

const replaceReferences = (data: object) =>
  mapValueParts(data, (valuePart: string) => {
    if (!valuePart.startsWith('$')) return valuePart
    if (valuePart.startsWith('$self')) return valuePart

    const reference = valuePart.split('.')[0].replace('$', '')
    const collection = reference.split('/')[0]
    const slug = reference.split('/').slice(1).join('/')
    const path = valuePart.split('.').slice(1).join('.')

    if (collection && slug) {
      const data = getEntry(collection as CollectionKey, slug).then(
        (v) => v?.data
      )
      const result = get(data, path)
      return result
    } else if (collection) {
      const data = getCollection(collection as CollectionKey).then((v) =>
        v?.map((entry: any) => entry.data)
      )
      return data
    }

    return valuePart
  })

export const pageSchema = (options: Partial<Options> = {}) =>
  z
    .object({})
    .passthrough()
    .transform(async (data: CollectionEntry<CollectionKey>['data']) => {
      const { casing, underscores, references, selfs } = merge(
        defaults,
        options
      )

      data = (await all(
        mapValues(flatten(data) as any, async (value) => {
          console.log({ value })

          if (typeof value !== 'string') return value
          const parts = value.split(' ')
          const results = await all(
            parts.map(async (valuePart) => {
              console.log({ valuePart })
              if (!valuePart.startsWith('$')) return valuePart
              if (valuePart.startsWith('$self')) return valuePart

              const reference = valuePart.split('.')[0].replace('$', '')
              const collection = reference.split('/')[0]
              const slug = reference.split('/').slice(1).join('/')
              const path = valuePart.split('.').slice(1).join('.')

              console.log({ collection, slug })

              if (collection && slug) {
                const response = await getEntry(
                  collection as CollectionKey,
                  slug
                )
                const result = get(response?.data, path)
                return result
              } else if (collection) {
                const response = await getCollection(
                  collection as CollectionKey
                )
                const result = response?.map((entry: any) => entry.data)
                return result
              }

              return valuePart
            })
          )
          if (results.length == 1) return results[0]
          return results.join(' ')
        })
      )) as any

      data = {
        ...data['0'],
        ...data,
      }

      data = unflatten(data)

      if (selfs) data = replaceSelfs(data)

      if (underscores) data = replaceUnderscores(data)

      if (casing) data = replaceCasing(data)

      delete data['0']

      return data
    })
