import { Column } from '@/components/column'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Row } from '@/components/row'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Writeup } from '@/components/writeup'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  align?: 'start' | 'center' | 'end'
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  products?: {
    href?: React.ComponentProps<typeof Link>['href']
    title?: string
    image?: React.ComponentProps<typeof Image>
    price?: React.ComponentProps<typeof Price>
  }[]
  children?: React.ReactNode
}

function Collection1({ align = 'start', title, description, products, children }: Props) {
  const [sortedProducts, setSortedProducts] = React.useState(products)
  const [sort, setSort] = React.useState('aanbevolen')

  const onSortChange = (value: string) => {
    setSort(value)
    const sorted = [...(products || [])].sort((a, b) => {
      if (value === 'prijs-laag-hoog') return (a.price?.amount || 0) - (b.price?.amount || 0)
      if (value === 'prijs-hoog-laag') return (b.price?.amount || 0) - (a.price?.amount || 0)
      if (value === 'titel-a-z') return (a.title || '').localeCompare(b.title || '')
      if (value === 'titel-z-a') return (b.title || '').localeCompare(a.title || '')
      return 0
    })
    setSortedProducts(sorted)
  }

  return (
    <Section className="collection collection-1">
      <Container align={align}>
        <Writeup
          align={align}
          title={title}
          description={description}
          size="sm"
        />
        <Column className="gap-0">
          <Row className="py-4 border-t">
            <span className="text-sm text-muted-foreground">{`${sortedProducts?.length || 0} producten`}</span>
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
                  <DropdownMenuRadioItem value="aanbevolen">Aanbevolen</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="prijs-laag-hoog">Prijs (laag-hoog)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="prijs-hoog-laag">Prijs (hoog-laag)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="titel-a-z">Alfabetisch (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="titel-z-a">Alfabetisch (Z-A)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Row>
          <Grid>
            {sortedProducts?.map(({ href, title, image, price }) => (
              <Link
                className="group flex flex-col"
                key={uuidv4()}
                href={href}
              >
                <Image
                  className="bg-card aspect-square rounded-md object-contain transition-opacity group-hover:opacity-75 bg-muted p-4 ring-1 ring-muted"
                  {...image}
                />
                <Heading
                  className="text-sm mt-5 mb-1"
                  as="h3"
                >
                  {title}
                </Heading>
                <Price
                  className="text-sm text-muted-foreground"
                  {...price}
                />
              </Link>
            ))}
          </Grid>
        </Column>
        <Prose>{children}</Prose>
      </Container>
    </Section>
  )
}

export { Collection1 }
