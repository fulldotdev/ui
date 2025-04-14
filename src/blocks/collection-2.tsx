import * as React from "react"
import { ChevronDown } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Collection2({
  className,
  id,
  level = 1,
  title,
  description,
  items,
  children,
}: BlockSchema & React.ComponentProps<typeof Section>) {
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
    <Section className={className} id={id}>
      <Container className="flex flex-col">
        <Title size="4xl" level={level}>
          {title}
        </Title>
        <Description className="not-first:mt-4">{description}</Description>
        <div className="flex flex-col gap-0 not-first:mt-16">
          <div className="flex items-center justify-between border-t py-4">
            <span className="text-muted-foreground text-sm">{`${sortedItems?.length || 0} producten`}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-foreground">
                  Sorteren
                  <ChevronDown />
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
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedItems?.map(
              ({ href, title, image, price, priceString, images }) => (
                <Link className="group flex flex-col" key={href} href={href}>
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
                  <Price className="text-muted-foreground text-sm" {...price} />
                </Link>
              )
            )}
          </div>
        </div>
        <Prose className="mt-16">{children}</Prose>
      </Container>
    </Section>
  )
}

export { Collection2 }
