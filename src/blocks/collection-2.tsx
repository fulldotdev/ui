import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { Title } from "@/components/title"

export interface Collection2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items?: {
    href: string
    title: string
    image?: React.ComponentProps<typeof Image>
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price> & { amount?: number }
    priceString?: string
  }[]
  children?: React.ReactNode
}

function Collection2({
  className,
  id,
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
      if (value === "prijs-laag-hoog")
        return (a.price?.amount || 0) - (b.price?.amount || 0)
      if (value === "prijs-hoog-laag")
        return (b.price?.amount || 0) - (a.price?.amount || 0)
      if (value === "titel-a-z")
        return (a.title || "").localeCompare(b.title || "")
      if (value === "titel-z-a")
        return (b.title || "").localeCompare(a.title || "")
      return 0
    })
    setSortedItems(sorted)
  }

  return (
    <section
      className={cn("relative w-full py-16", className)}
      id={id}
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Title size="4xl" level={level}>
            {title}
          </Title>
          {description && (
            <Description className="not-first:mt-4">{description}</Description>
          )}
          <div className="flex flex-col gap-0 not-first:mt-16">
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
            {sortedItems && sortedItems.length > 0 && (
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedItems.map(
                  ({ href, title, image, price, priceString, images }) => (
                    <Link
                      className="group flex flex-col"
                      key={href}
                      href={href}
                    >
                      <Image
                        className="rounded-md transition-opacity group-hover:opacity-75"
                        {...(image || images?.[0])}
                      />
                      <Title level={3} className="text-sm not-first:mt-3">
                        {title}
                      </Title>
                      <Description className="text-muted-foreground text-sm not-first:mt-1">
                        {priceString}
                      </Description>
                      <Price
                        className="text-muted-foreground text-sm"
                        {...price}
                      />
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
          {children && <Prose className="mt-16">{children}</Prose>}
        </div>
      </div>
    </section>
  )
}

export { Collection2 }
