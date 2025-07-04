import * as React from "react"

function SidebarNav({
  items,
  ...props
}: React.ComponentProps<"aside"> & {
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}) {
  return (
    <aside className="z-30 flex w-3xs flex-col items-start" {...props}>
      {items?.map((item, i) =>
        item.links ? (
          <div
            className="flex flex-col items-start gap-4 not-first:mt-8"
            key={i}
          >
            <div className="text-muted-foreground text-sm font-medium">
              {item.text}
            </div>
            {item.links?.map((link, i) => (
              <a
                key={i}
                className="text-sm font-medium hover:underline"
                {...link}
              >
                {link.text}
              </a>
            ))}
          </div>
        ) : (
          <a className="text-xl font-medium hover:underline" key={i} {...item}>
            {item.text}
          </a>
        )
      )}
    </aside>
  )
}

export { SidebarNav }
