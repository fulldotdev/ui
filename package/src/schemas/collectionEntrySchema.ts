import { getEntry } from 'astro:content';
import merge from 'deepmerge';
import { flatten, unflatten } from 'flat';
import { camel, mapValues } from 'radash';
import { removeProp } from 'remove-anything';
import { z } from 'zod';

export const collectionEntrySchema = z
  .object({
    layout: z.string().optional(),
  })
  .passthrough()
  .transform(async (data: any) => {
    console.log('data', data);

    const flatMergedCamel: any = flatten(data, {
      transformKey: (key: any) => {
        const noLeadingUnderscore = key.replace(/^_+/, '');
        const camelCase = camel(noLeadingUnderscore);
        return camelCase;
      },
    });

    console.log('flatMergedCamel', flatMergedCamel);

    const noNull = removeProp(flatMergedCamel, null);
    console.log('flatMergedCamel', flatMergedCamel);

    const nested: any = unflatten(noNull);
    console.log('nested', nested);

    const layoutData = undefined;
    nested.layout && (await getEntry('layouts', nested.layout))?.data;
    console.log('layoutData', layoutData);

    const merged = merge(layoutData || {}, nested || {});
    console.log('merged', merged);

    const flat: any = flatten(merged);
    console.log('flat', flat);

    const noFalse = removeProp(flat, false);
    console.log('noFalse', noFalse);

    const replacedSelfVars = mapValues(noFalse, (value) => {
      if (typeof value !== 'string') return value;

      if (value.startsWith('$self.')) {
        const key = value.replace('$self.', '');
        return data[key];
      }

      return value;
    });

    // TODO replace $vars with actual values
    // - $collection
    // - $collection.entry
    // - $collection.entry.key
    // - $collection.*.key
    // const replacedCollectionVars = mapValues(replacedThisVars, (value) => {
    //   if (typeof value !== 'string') return value;

    //   if (!value.startsWith('$self.') && value.startsWith('$')) {
    //     const collection = value.split('.')[0] as CollectionKey;
    //     const slug = value.split('.')[1];
    //     const key = value.split('.').slice(2).join('.');

    //     if (collection && (!slug || slug === '*')) {
    //       const res = await getCollection(collection);
    //       if (slug === '*' && key) return res.map((entry) => entry.data[key]);
    //       return res;
    //     }

    //     if (collection && slug && key) {
    //       const res = await getEntry(collection, slug);
    //       return res?.data[key];
    //     }

    //     return value;
    //   }

    //   return value;
    // });

    console.log('replacedSelfVars', replacedSelfVars);

    const nestedAgain = unflatten(replacedSelfVars);
    console.log('nestedAgain', nestedAgain);

    console.log({
      flatMergedCamel,
      noNull,
      nested,
      layoutData,
      merged,
      flat,
      noFalse,
      replacedSelfVars,
      nestedAgain,
    });

    return nestedAgain;
  });
