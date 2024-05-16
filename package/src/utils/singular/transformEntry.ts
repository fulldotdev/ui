import type { CollectionEntry, CollectionKey } from 'astro:content'
import { transformCasing } from './transformCasing'
import { transformLayouts } from './transformLayouts'
import { transformPathname } from './transformPathname'
import { transformReferences } from './transformReferences'

export const transformEntry = (
  entry: CollectionEntry<CollectionKey>,
  allEntries: CollectionEntry<CollectionKey>[]
) => {
  entry = transformReferences(entry, allEntries)
  entry = transformPathname(entry)
  entry = transformLayouts(entry)
  entry = transformCasing(entry)
}
