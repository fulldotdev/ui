import {
  getEntry,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
} from 'astro:content'

interface Test {
  [key: ContentCollectionKey]: CollectionEntry<ContentCollectionKey>['slug']
}

export type EntryReference =
  | {
      collection?: ContentCollectionKey
      slug?: CollectionEntry<ContentCollectionKey>['slug']
    }
  | {
      [Key in CollectionKey]?: CollectionEntry<ContentCollectionKey>['slug']
    }

export const getEntryByProps = async (
  props: Partial<EntryReference>
): Promise<CollectionEntry<ContentCollectionKey> | undefined> => {
  const slug = 'slug' in props ? props.slug : undefined
  const collection = 'collection' in props ? props.collection : undefined
  if (collection && slug) return getEntry(collection, slug)

  const promises = Object.keys(props).map((key) => {
    // @ts-ignore
    return getEntry(key, props[key])
  })

  return (await Promise.all(promises)).find(Boolean)
}
