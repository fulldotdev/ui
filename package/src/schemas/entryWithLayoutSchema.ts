import { getEntry } from 'astro:content'
import merge from 'deepmerge'
import { flatten, unflatten } from 'flat'
import { camel } from 'radash'
import { removeProp } from 'remove-anything'
import { z } from 'zod'

export const entryWithLayoutSchema = z
  .object({
    layout: z.string().optional(),
  })
  .passthrough()
  .transform(async (data: any) => {
    const flatMergedCamel: any = flatten(data, {
      transformKey: (key: any) => {
        const noLeadingUnderscore = key.replace(/^_+/, '')
        const camelCase = camel(noLeadingUnderscore)
        return camelCase
      },
    })

    const noNull = removeProp(flatMergedCamel, null)
    const nested: any = unflatten(noNull)
    const layoutData =
      nested.layout && (await getEntry('layouts', nested.layout))?.data

    const merged = merge(layoutData || {}, nested || {})
    const flat: any = flatten(merged)
    const noFalse = removeProp(flat, false)
    const nestedAgain = unflatten(noFalse)

    return nestedAgain
  })
