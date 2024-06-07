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
"base/textarea.mdx": {
	id: "base/textarea.mdx";
  slug: "base/textarea";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/colors.mdx": {
	id: "overview/colors.mdx";
  slug: "overview/colors";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"overview/components.mdx": {
	id: "overview/components.mdx";
  slug: "overview/components";
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
"overview/sizes.mdx": {
	id: "overview/sizes.mdx";
  slug: "overview/sizes";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/body.mdx": {
	id: "segment/body.mdx";
  slug: "segment/body";
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
"segment/carousel.mdx": {
	id: "segment/carousel.mdx";
  slug: "segment/carousel";
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
"segment/footer.mdx": {
	id: "segment/footer.mdx";
  slug: "segment/footer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/form.mdx": {
	id: "segment/form.mdx";
  slug: "segment/form";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/header.mdx": {
	id: "segment/header.mdx";
  slug: "segment/header";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/main.mdx": {
	id: "segment/main.mdx";
  slug: "segment/main";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"segment/prose.mdx": {
	id: "segment/prose.mdx";
  slug: "segment/prose";
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
"structure/bento.mdx": {
	id: "structure/bento.mdx";
  slug: "structure/bento";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/carousel.mdx": {
	id: "structure/carousel.mdx";
  slug: "structure/carousel";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/grid.mdx": {
	id: "structure/grid.mdx";
  slug: "structure/grid";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/group.mdx": {
	id: "structure/group.mdx";
  slug: "structure/group";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/masonry.mdx": {
	id: "structure/masonry.mdx";
  slug: "structure/masonry";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/split.mdx": {
	id: "structure/split.mdx";
  slug: "structure/split";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/spread.mdx": {
	id: "structure/spread.mdx";
  slug: "structure/spread";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"structure/stack.mdx": {
	id: "structure/stack.mdx";
  slug: "structure/stack";
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
"typography/paragraph.mdx": {
	id: "typography/paragraph.mdx";
  slug: "typography/paragraph";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
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
"DensityProp.mdx": {
	id: "DensityProp.mdx";
  slug: "densityprop";
  body: string;
  collection: "props";
  data: any
} & { render(): Render[".mdx"] };
"HtmlProp.mdx": {
	id: "HtmlProp.mdx";
  slug: "htmlprop";
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
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
