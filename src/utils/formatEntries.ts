import type { CollectionEntry } from 'astro:content'
import { formatEntry } from './formatEntry'

export const formatEntries = (
  entries: CollectionEntry<
    'categories' | 'docs' | 'pages' | 'posts' | 'products'
  >[]
) => entries.map(formatEntry)
