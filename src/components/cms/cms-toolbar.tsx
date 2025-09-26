import type { CollectionEntry } from "astro:content"

import CmsPageEdit from "@/components/cms/cms-page-edit"

export default function CmsPage(entry: CollectionEntry<"pages">) {
  return (
    <div className="bg-foreground fixed bottom-8 left-1/2 -translate-x-1/2 rounded-md p-2">
      <CmsPageEdit {...entry} />
    </div>
  )
}
