import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content'
import { unflatten } from 'flat'
import { all, camel, crush, get, mapValues } from 'radash'
import { mapKeys, merge } from 'remeda'
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

const replaceUnderscores = (keyPart: string) => {
  if (/^_+$/.test(keyPart)) return '$template$' // only underscores
  return keyPart.replace(/^_+/, '') // leading underscores
}

const replaceCasing = (keyPart: string) => camel(keyPart)

const replaceTemplates = (keyPart: string) =>
  keyPart == '$template$' ? undefined : keyPart

const replaceQueries = async (valuePart: string, self: any) => {
  if (!valuePart.startsWith('$')) return valuePart
  const reference = valuePart.split('.')[0].replace('$', '')
  const path = valuePart.split('.').slice(1).join('.')
  const collection = reference.split('/')[0]
  const slug = reference.split('/').slice(1).join('/')

  if (collection == 'self') {
    const result = get(self, path)
    return result
  }

  if (collection && slug) {
    const response = await getEntry(collection as CollectionKey, slug)
    const result = get(response?.data, path)
    return result
  }

  if (collection) {
    const response = await getCollection(collection as CollectionKey)
    const result = response.map((entry) => get(entry.data, path))
    return result
  }
}

export const pageSchema = (options: Partial<Options> = {}) =>
  z.any().transform(async (data: CollectionEntry<CollectionKey>['data']) => {
    const { casing, underscores, templates, queries } = merge(defaults, options)
    const flat: any = crush(data)

    const mappedKeys = mapKeys(flat, (key) => {
      if (typeof key !== 'string') return key
      let i: number = 0
      return key
        .split('.')
        .map((keyPart) => {
          if (underscores) return replaceUnderscores(keyPart)
          if (casing) return replaceCasing(keyPart)
          i++
          return keyPart
        })
        .join('.')
    })

    const mappedValues = await all(
      mapValues(mappedKeys, async (value) => {
        if (typeof value !== 'string') return value
        const parts = value.split(' ')
        const results = await all(
          parts.map(async (valuePart) => {
            if (queries) return replaceQueries(valuePart, data)
            if (templates) return replaceTemplates(valuePart)
            return valuePart
          })
        )
        if (results.length == 1) return results[0]
        return results.join(' ')
      })
    )

    return unflatten(mappedValues)
  })
