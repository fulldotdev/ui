import { getEntry } from 'astro:content';
import merge from 'deepmerge';
import { flatten, unflatten } from 'flat';
import { camel, crush, mapKeys, mapValues } from 'radash';
import { removeProp } from 'remove-anything';
import { z } from 'zod';

const removeUnderscore = (obj: any) =>
  mapKeys(obj, (key) => key.toString().replace(/^_+/, ''));

const camelCase = (obj: any) => mapKeys(obj, (key) => camel(key.toString()));

const removeNull = (obj: any) => removeProp(obj, null);

const removeFalse = (obj: any) => removeProp(obj, false);

export const collectionEntrySchema = z
  .object({
    layout: z.string().optional(),
  })
  .passthrough()
  .transform(async (data: any) => {
    console.log('data', data);

    const curshed: any = crush(data);
    const noUnderscore = mapKeys(curshed, (key) =>
      key.toString().replace(/^_+/, '')
    );
    const camelized = mapKeys(noUnderscore, (key) => camel(key));

    const flatMergedCamel: any = flatten(data, {
      transformKey: (key: any) => {
        const noLeadingUnderscore = key.replace(/^_+/, '');
        const camelCase = camel(noLeadingUnderscore);
        return camelCase;
      },
    });

    const noNull = removeProp(flatMergedCamel, null);
    const nested: any = unflatten(noNull);
    const layoutData = undefined;
    nested.layout && (await getEntry('layouts', nested.layout))?.data;

    const merged = merge(layoutData || {}, nested || {});
    const flat: any = flatten(merged);
    const noFalse = removeProp(flat, false);

    const replacedSelfVars = mapValues(noFalse, (value) => {
      if (typeof value !== 'string') return value;

      if (value.startsWith('$self.')) {
        const key = value.replace('$self.', '');

        console.log('flat', flat);
        console.log('key', key);
        return flat[key];
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

    const nestedAgain = unflatten(replacedSelfVars);

    return nestedAgain;
  });
