import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
  type DataCollectionKey,
} from 'astro:content'

type DataId = CollectionEntry<DataCollectionKey>['id']
type ContentSlug = CollectionEntry<ContentCollectionKey>['slug']

export interface GetEntryOrCollection {
  collection?: ContentCollectionKey
  slug?: ContentSlug | DataId
  reference: {
    collection?: ContentCollectionKey
    slug?: ContentSlug | DataId
  }
}

type Return =
  | CollectionEntry<CollectionKey>
  | CollectionEntry<CollectionKey>[]
  | undefined

export const getEntryOrCollection = async ({
  collection,
  slug,
  reference,
}: GetEntryOrCollection): Promise<Return> => {
  collection = reference.collection ?? collection
  slug = reference.slug ?? slug

  if (!collection) return
  if (slug) return await getEntry(collection, slug)
  return await getCollection(collection)
}
