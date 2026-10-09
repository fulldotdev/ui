import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

const tags = Array.from(
  { length: 40 },
  (_, index) => `v1.2.0-beta.${40 - index}`
)

const works = [
  { artist: "Ornella Binni", title: "Morning light" },
  { artist: "Tom Byrom", title: "Harbour" },
  { artist: "Vladimir Malyavko", title: "Dunes" },
  { artist: "Ana Silva", title: "City walk" },
  { artist: "Jonas Berg", title: "Lake house" },
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Vertical">
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            {tags.map((tag) => (
              <React.Fragment key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </Example>

      <Example title="Horizontal">
        <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
          <div className="flex w-max gap-4 p-4">
            {works.map((work) => (
              <figure key={work.title} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={placeholderImage.src}
                    alt={`${work.title} by ${work.artist}`}
                    className="aspect-[3/4] h-fit w-[150px] object-cover"
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  Photo by{" "}
                  <span className="font-semibold text-foreground">
                    {work.artist}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Example>

      <Example title="Both directions">
        <ScrollArea className="h-48 w-72 rounded-md border">
          <div className="grid w-[40rem] grid-cols-8 gap-2 p-4">
            {Array.from({ length: 96 }, (_, index) => (
              <div
                key={index}
                className="flex h-10 items-center justify-center rounded-sm bg-muted text-xs tabular-nums"
              >
                {index + 1}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Example>
    </div>
  )
}
