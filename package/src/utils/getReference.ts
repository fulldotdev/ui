import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
} from 'astro:content'

// TODO support data collections, support id's, support zod references

export type GetReference =
  | {
      collection?: ContentCollectionKey
      slug?: CollectionEntry<ContentCollectionKey>['slug']
    }
  | {
      [Key in 'collection' | 'cards']?: ContentCollectionKey
    }
  | {
      [Key in CollectionKey]?: CollectionEntry<ContentCollectionKey>['slug'][]
    }

export const getReference = async (
  props: Partial<GetReference>
): Promise<
  | CollectionEntry<ContentCollectionKey>
  | CollectionEntry<ContentCollectionKey>
  | undefined
> => {
  const slug = 'slug' in props ? props.slug : undefined
  const collection = 'collection' in props ? props.collection : undefined
  const cards = 'cards' in props ? props.cards : undefined

  if (collection && slug) return getEntry(collection, slug)
  if (collection) return getCollection(collection)
  if (cards) return getCollection(cards)

  const keys = Object.keys(props)
  // FIXME hack to temporarily disable console.warn
  const temp = console.warn
  console.warn = () => {}
  const promises = keys.map((key) => {
    const temp = console.warn
    console.warn = () => {} // disable console.warn
    // @ts-ignore
    const col = getCollection(key, (entry) => props[key].includes(entry.slug))
    console.warn = temp // enable console.warn
    return col
  })
  const resolved = await Promise.all(promises)
  // FIXME re-enable console.warn
  console.warn = temp // enable console.warn
  const entries = resolved.flat()
  return entries
}
