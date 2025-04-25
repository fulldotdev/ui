import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn, money } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Prose } from "@/components/ui/prose"

export interface Collection2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    href: string
    title: string
    price: number
    image: {
      src: string
      alt: string
    }
  }[]
}

function Collection2({
  className,
  level = 1,
  title,
  description,
  items,
  children,
  ...props
}: Collection2Props) {
  const [sortedItems, setSortedItems] = React.useState(items)
  const [sort, setSort] = React.useState("aanbevolen")

  const onSortChange = (value: string) => {
    setSort(value)
    const sorted = [...(items || [])].sort((a, b) => {
      if (value === "prijs-laag-hoog") return (a.price || 0) - (b.price || 0)
      if (value === "prijs-hoog-laag") return (b.price || 0) - (a.price || 0)
      if (value === "titel-a-z")
        return (a.title || "").localeCompare(b.title || "")
      if (value === "titel-z-a")
        return (b.title || "").localeCompare(a.title || "")
      return 0
    })
    setSortedItems(sorted)
  }

  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && <Paragraph className="mt-4">{description}</Paragraph>}
          <div className="mt-16 flex flex-col gap-0">
            <div className="flex items-center justify-between border-t py-4">
              <span className="text-muted-foreground text-sm">{`${sortedItems?.length || 0} producten`}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-foreground">
                    Sorteren
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={onSortChange}
                  >
                    <DropdownMenuRadioItem value="aanbevolen">
                      Aanbevolen
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="prijs-laag-hoog">
                      Prijs (laag-hoog)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="prijs-hoog-laag">
                      Prijs (hoog-laag)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="titel-a-z">
                      Alfabetisch (A-Z)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="titel-z-a">
                      Alfabetisch (Z-A)
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 not-first:mt-8 sm:grid-cols-[repeat(auto-fill,minmax(236px,1fr))]">
              {sortedItems.map(({ href, title, image, price }) => (
                <a className="group flex flex-col" key={href} href={href}>
                  <img
                    className="rounded-md transition-opacity group-hover:opacity-75"
                    {...image}
                  />
                  <Heading className="mt-3.5" size="sm" level={level + 1}>
                    {title}
                  </Heading>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {money(price?.amount || price)}
                  </div>
                </a>
              ))}
            </div>
          </div>
          {children && <Prose className="mt-16">{children}</Prose>}
        </div>
      </div>
    </section>
  )
}

export { Collection2 }
