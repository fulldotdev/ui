declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"base/badge.mdx": {
	id: "base/badge.mdx";
  slug: "base/badge";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/button.mdx": {
	id: "base/button.mdx";
  slug: "base/button";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/checkbox.mdx": {
	id: "base/checkbox.mdx";
  slug: "base/checkbox";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/icon.mdx": {
	id: "base/icon.mdx";
  slug: "base/icon";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/image.mdx": {
	id: "base/image.mdx";
  slug: "base/image";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/input.mdx": {
	id: "base/input.mdx";
  slug: "base/input";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/radio.mdx": {
	id: "base/radio.mdx";
  slug: "base/radio";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/rating.mdx": {
	id: "base/rating.mdx";
  slug: "base/rating";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/select.mdx": {
	id: "base/select.mdx";
  slug: "base/select";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/switch.mdx": {
	id: "base/switch.mdx";
  slug: "base/switch";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/table.mdx": {
	id: "base/table.mdx";
  slug: "base/table";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"base/textarea.mdx": {
	id: "base/textarea.mdx";
  slug: "base/textarea";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/frameworks.mdx": {
	id: "overview/frameworks.mdx";
  slug: "overview/frameworks";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/installation.mdx": {
	id: "overview/installation.mdx";
  slug: "overview/installation";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/introduction.mdx": {
	id: "overview/introduction.mdx";
  slug: "overview/introduction";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/theming.mdx": {
	id: "overview/theming.mdx";
  slug: "overview/theming";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/box.mdx": {
	id: "segment/box.mdx";
  slug: "segment/box";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/card.mdx": {
	id: "segment/card.mdx";
  slug: "segment/card";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/deck.mdx": {
	id: "segment/deck.mdx";
  slug: "segment/deck";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/group.mdx": {
	id: "segment/group.mdx";
  slug: "segment/group";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/section.mdx": {
	id: "segment/section.mdx";
  slug: "segment/section";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/heading.mdx": {
	id: "typography/heading.mdx";
  slug: "typography/heading";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/label.mdx": {
	id: "typography/label.mdx";
  slug: "typography/label";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/link.mdx": {
	id: "typography/link.mdx";
  slug: "typography/link";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/list.mdx": {
	id: "typography/list.mdx";
  slug: "typography/list";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/tagline.mdx": {
	id: "typography/tagline.mdx";
  slug: "typography/tagline";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"typography/text.mdx": {
	id: "typography/text.mdx";
  slug: "typography/text";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};
"pages": {
"components.mdx": {
	id: "components.mdx";
  slug: "components";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdx"] };
};
"props": {
"AsProp.mdx": {
	id: "AsProp.mdx";
  slug: "asprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"CompactProp.mdx": {
	id: "CompactProp.mdx";
  slug: "compactprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"SizeProp.mdx": {
	id: "SizeProp.mdx";
  slug: "sizeprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"StructureProp.mdx": {
	id: "StructureProp.mdx";
  slug: "structureprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"TextProp.mdx": {
	id: "TextProp.mdx";
  slug: "textprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"ThemeProp.mdx": {
	id: "ThemeProp.mdx";
  slug: "themeprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"VariantProp.mdx": {
	id: "VariantProp.mdx";
  slug: "variantprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"frames/Container.mdx": {
	id: "frames/Container.mdx";
  slug: "frames/container";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"frames/Panel.mdx": {
	id: "frames/Panel.mdx";
  slug: "frames/panel";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"frames/Wrapper.mdx": {
	id: "frames/Wrapper.mdx";
  slug: "frames/wrapper";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Carousel.mdx": {
	id: "structures/Carousel.mdx";
  slug: "structures/carousel";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Column.mdx": {
	id: "structures/Column.mdx";
  slug: "structures/column";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Grid.mdx": {
	id: "structures/Grid.mdx";
  slug: "structures/grid";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Masonry.mdx": {
	id: "structures/Masonry.mdx";
  slug: "structures/masonry";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Row.mdx": {
	id: "structures/Row.mdx";
  slug: "structures/row";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Split.mdx": {
	id: "structures/Split.mdx";
  slug: "structures/split";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"structures/Spread.mdx": {
	id: "structures/Spread.mdx";
  slug: "structures/spread";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
