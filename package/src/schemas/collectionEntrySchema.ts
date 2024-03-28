import { getEntry } from 'astro:content'
import merge from 'deepmerge'
import { flatten, unflatten } from 'flat'
import { removeProp } from 'remove-anything'
import { z } from 'zod'

export const collectionEntrySchema = z
  .object({
    layout: z.string().optional(),
  })
  .passthrough()
  .transform(async (data: any) => {
    const noUnderscore: any = flatten(data, {
      transformKey: (key: any) => key.replace(/_/g, ''),
    })
    const noNull = removeProp(noUnderscore, null)

    const layoutData =
      data.layout && (await getEntry('layouts', data.layout))?.data

    const nested = unflatten(noNull)
    const merged = merge(layoutData || {}, nested || {})
    const flat: any = flatten(merged)

    const noFalse = removeProp(flat, false)

    // TODO replace $vars with actual values
    // - $this.key
    // - $collection
    // - $collection.entry
    // - $collection.entry.key

    // const no$ = mapObject(noFalse, (object: any, key) => {
    //   const id = key
    //   return { ...object, id }
    // })
    // console.log('no$', no$)

    const nestedAgain = unflatten(noFalse)

    console.log({
      data,
      noUnderscore,
      noNull,
      layoutKey: data.layout,
      layoutData,
      nested,
      merged,
      flat,
      noFalse,
      nestedAgain,
    })

    return nestedAgain
  })
