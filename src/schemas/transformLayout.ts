// @ts-nocheck
import { getEntry } from 'astro:content'
import { assign } from 'radash'

export async function transformLayout<T extends any>(data: T): Promise<T> {
  const baseLayoutData = (await getEntry('layouts', 'layout')).data
  const customLayoutData = data._layout && (await getEntry(data._layout)).data
  const mergedLayoutData = assign(baseLayoutData, customLayoutData ?? {})
  const mergedData = assign(mergedLayoutData, data)
  return mergedData
}
