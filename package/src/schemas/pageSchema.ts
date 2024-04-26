import { getEntry, type CollectionKey } from 'astro:content'
import merge from 'deepmerge'
import { flatten, unflatten } from 'flat'
import { camel } from 'radash'
import { removeProp } from 'remove-anything'
import { z } from 'zod'

interface Args {
  nestify: boolean
  camelCase: boolean
  mergeUnderscores: boolean
  layouts: CollectionKey | false
  removeNull: boolean
  removeFalse: boolean
}

const defaults: Args = {
  nestify: true,
  camelCase: true,
  mergeUnderscores: true,
  layouts: 'layouts',
  removeNull: true,
  removeFalse: true,
}

export const pageSchema = (options?: Args) =>
  z
    .object({
      layout: z.string().optional(),
    })
    .passthrough()
    .transform(async (data: any) => {
      const {
        nestify,
        camelCase,
        mergeUnderscores,
        layouts,
        removeNull,
        removeFalse,
      } = merge(defaults, options || {})

      const object = nestify ? unflatten(data) : data
      const flat: any = flatten(object, {
        transformKey: (key: any) => {
          const merged = mergeUnderscores ? key.replace(/^_+/, '') : key
          const cased = camelCase ? camel(merged) : merged
          return cased
        },
      })

      const noNull = removeNull ? removeProp(flat, null) : flat
      const nested = unflatten(noNull)

      const layout =
        layouts && data.layout && (await getEntry('layouts', data.layout))

      const merged = merge(layout?.data || {}, nested || {})
      const flatAgain: any = flatten(merged)
      const noFalse = removeFalse ? removeProp(flatAgain, false) : flatAgain
      const nestedAgain = unflatten(noFalse)

      return nestedAgain
    })
