import { collectionEntrySchema } from '@fulldevlabs/fullui';
import { defineCollection } from 'astro:content';

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: collectionEntrySchema,
  }),
  // layouts: defineCollection({
  //   type: 'content',
  //   schema: collectionEntrySchema,
  // }),
};
