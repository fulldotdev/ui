import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import type { CollectionProps } from "@/schemas/blocks/collection"
import { ChevronDown } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/button"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Grid } from "@/components/grid"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { Row } from "@/components/row"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Collection1({
  level = 1,
  align,
  title,
  description,
  products,
  children,
  className,
  ...props
}: BlockSchema & React.ComponentProps<typeof Section>) {
  const [sortedProducts, setSortedProducts] = React.useState(products)
  const [sort, setSort] = React.useState("aanbevolen")

  const onSortChange = (value: string) => {
    setSort(value)
    const sorted = [...(products || [])].sort((a, b) => {
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
    setSortedProducts(sorted)
  }

  return (
    <Section className={cn(className)} {...props}>
      <Container>
        <Column align={align}>
          <Title size="4xl" level={level} align={align} text={title} />
          <Description
            className="not-first:mt-4"
            align={align}
            text={description}
          />
          <Column className="gap-0 not-first:mt-16">
            <Row className="border-t py-4">
              <span className="text-muted-foreground text-sm">{`${sortedProducts?.length || 0} producten`}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
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
            </Row>
            <Grid className="gap-x-4 gap-y-8">
              {sortedProducts?.map(({ href, title, image, price }) => (
                <Link
                  className="group flex flex-col"
                  key={uuidv4()}
                  href={href}
                >
                  <Image
                    className="bg-muted ring-muted aspect-square rounded-md object-contain p-4 ring-1 transition-opacity group-hover:opacity-75"
                    {...image}
                  />
                  <Title
                    level={level + 1}
                    className="mt-5 mb-1 text-sm"
                    text={title}
                  />
                  <Price className="text-muted-foreground text-sm" {...price} />
                </Link>
              ))}
            </Grid>
          </Column>
          <Prose>{children}</Prose>
        </Column>
      </Container>
    </Section>
  )
}

export { Collection1 }
