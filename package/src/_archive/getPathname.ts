// import type { AstroGlobal } from 'astro'
// import type { CollectionEntry, ContentCollectionKey } from 'astro:content'

// export const getPathname = ({
//   slug,
//   collection,
//   data,
// }: CollectionEntry<ContentCollectionKey>):
//   | AstroGlobal['url']['pathname']
//   | undefined => {
//   if (!slug) return
//   if (data.draft) return
//   if (data.output === false) return
//   if (collection === 'pages' && slug === 'index') return '/'
//   if (collection === 'pages') return `/${slug}`
//   if (slug === 'index') return `/${collection}`
//   return `/${collection}/${slug}`
// }
