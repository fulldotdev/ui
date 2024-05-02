import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content'
import { flatten, unflatten } from 'flat'
import { all, camel, construct, get, isString, mapValues } from 'radash'
import { mapKeys, merge } from 'remeda'
import { z } from 'zod'

interface Options {
  casing: boolean
  layouts: boolean
  references: boolean
  selfs: boolean
}

const defaults: Options = {
  casing: true,
  layouts: true,
  references: true,
  selfs: true,
}

const transformReferences = async (data: object) =>
  await all(
    mapValues(flatten(data) as any, async (value) => {
      if (typeof value !== 'string') return value
      const parts = value.split(' ')
      const results = await all(
        parts.map(async (valuePart) => {
          if (!valuePart.startsWith('$')) return valuePart
          if (valuePart.startsWith('$self')) return valuePart

          const reference = valuePart.split('.')[0].replace('$', '')
          const collection = reference.split('/')[0]
          const slug = reference.split('/').slice(1).join('/')
          const path = valuePart.split('.').slice(1).join('.')

          if (collection && slug) {
            const response = await getEntry(collection as CollectionKey, slug)
            const result = get(response?.data, path)
            return result
          } else if (collection) {
            const response = await getCollection(collection as CollectionKey)
            const result = response?.map((entry: any) => entry.data)
            return result
          }

          return valuePart
        })
      )
      if (results.length == 1) return results[0]
      return results.join(' ')
    })
  )

const transformLayouts = (data: object) => {
  const flat: any = flatten(data)
  let store: any = {}
  let i: number = 0

  const merged = mapKeys(flat, (key) => {
    if (!isString(key)) return key
    const parts = key.split('.')
    const result = parts.map((part) => {
      // Concatenating array indexes
      // if (isNumber(parseInt(part))) {
      //   i++
      //   return i.toString()

      // let index = parseInt(part)
      // const path = parts.slice(0, i).join('.').replace(/^_+/, '')

      // if (store[path] > index) store[path]++
      // else store[path] = index

      // console.log({
      //   key,
      //   part,
      //   path,
      //   index,
      //   store,
      // })

      // return store[path].toString()
      //   }
      // Removing leading underscores
      return part.replace(/^_+/, '')
    })
    const filtered = result.filter(Boolean)
    const joined = filtered.join('.')
    return joined
  })
  const nested = construct(merged)
  return nested
}

const transformSelfs = (data: object) => {
  const flat = flatten(data) as any
  const mapped = mapValues(flat, (value) => {
    if (!isString(value)) return value
    const parts = (value as string).split(' ')
    const result = parts.map((part) => {
      if (!part.startsWith('$self')) return part
      const pathParts = part.split('.').slice(1)
      const camelCased = pathParts.map((part) => camel(part))
      const path = camelCased.join('.')
      const result = get(data, path)
      return result
    })
    return result.join(' ')
  })
  return unflatten(mapped)
}

const transformCasing = (object: object) => {
  const flat = flatten(object)
  const mapped = mapKeys(flat, (key) => {
    if (!isString(key)) return key
    const parts = (key as string).split('.')
    const result = parts.map((part) => camel(part))
    return result.join('.')
  })
  return unflatten(mapped)
}

export const pageSchema = (options: Partial<Options> = {}) =>
  z.any().transform(async (data: CollectionEntry<CollectionKey>['data']) => {
    const { layouts, casing, references, selfs } = merge(defaults, options)

    if (references) data = await transformReferences(data)
    console.log('references', data)

    if (layouts) data = transformLayouts(data)
    console.log('layouts', data)

    if (selfs) data = transformSelfs(data)
    console.log('selfs', data)

    if (casing) data = transformCasing(data)
    console.log('casing', data)

    return data
  })
