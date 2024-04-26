import { getEntry, type CollectionKey } from 'astro:content'
import merge from 'deepmerge'
import { flatten, unflatten } from 'flat'
import { camel } from 'radash'
import { removeProp } from 'remove-anything'
import { z } from 'zod'

export const pageSchema = ({
  nestify = true,
  camelCase = true,
  mergeUnderscores = true,
  layouts = 'layouts',
  removeNull = true, // otherwise it will overwrite layout values
  removeFalse = true, // for removing layout values
}: {
  nestify: boolean
  camelCase: boolean
  mergeUnderscores: boolean
  layouts: CollectionKey | false
  removeNull: boolean
  removeFalse: boolean
}) =>
  z
    .object({
      layout: z.string().optional(),
    })
    .passthrough()
    .transform(async (data: any) => {
      if (!nestify) return data
      const flat: any = flatten(data, {
        transformKey: (key: any) => {
          const cased = camelCase ? camel(key) : key
          const merged = mergeUnderscores ? cased.replace(/^_+/, '') : cased
          return merged
        },
      })

      const noNull = removeNull ? removeProp(flat, null) : flat
      const nested = unflatten(noNull)

      const layout =
        layouts && data.layout && (await getEntry('layouts', data.layout))

      const merged = merge(layout.data || {}, nested || {})
      const flatAgain: any = flatten(merged)
      const noFalse = removeFalse ? removeProp(flatAgain, false) : flatAgain
      const nestedAgain = unflatten(noFalse)

      return nestedAgain
    })
