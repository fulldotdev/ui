import {
  getEntry,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
  type DataCollectionKey,
} from 'astro:content'

type DataId = CollectionEntry<DataCollectionKey>['id']
type ContentSlug = CollectionEntry<ContentCollectionKey>['slug']

export interface GetEntryByProps {
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

export const getEntryByProps = async ({
  collection,
  slug,
  reference,
}: GetEntryByProps): Promise<Return> => {
  collection = reference.collection ?? collection
  slug = reference.slug ?? slug

  if (!collection || !slug) return
  return await getEntry(collection, slug)
}
