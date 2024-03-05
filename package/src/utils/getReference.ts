import { type CollectionEntry, type ContentCollectionKey } from 'astro:content'

type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']

export interface GetReference {
  collection?: ContentCollectionKey
  slug?: EntrySlug
  reference?: {
    collection?: ContentCollectionKey
    slug?: EntrySlug
  }
}

type Return =
  | {
      collection: ContentCollectionKey
      slug: EntrySlug
    }
  | undefined

export const getReference = ({
  collection,
  slug,
  reference,
}: GetReference): Return => {
  collection = reference?.collection ?? collection
  slug = reference?.slug ?? slug

  if (!collection || !slug) return
  return { collection, slug }
}
