import { Box } from '@/components/box'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Paragraph } from '@/components/paragraph'
import { Price } from '@/components/price'
import { Prose } from '@/components/prose'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  title?: string
  description?: string
  products?: {
    href?: React.ComponentProps<typeof Link>['href']
    title?: string
    image?: React.ComponentProps<typeof Image>
    price?: React.ComponentProps<typeof Price>
  }[]
  children?: React.ReactNode
}

function Collection1({ title, description, products, children }: Props) {
  return (
    <Section className="collection collection-1">
      <Container className="flex flex-col gap-12">
        <Box className="border-b py-12">
          <Writeup
            className="items-start text-start"
            size="sm"
          >
            <Heading as="h1">{title}</Heading>
            <Paragraph>{description}</Paragraph>
          </Writeup>
        </Box>
        <Grid
          length={products?.length}
          className="gap-x-8"
        >
          {products?.map(({ href, title, image, price }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card aspect-square rounded-lg object-contain transition-opacity group-hover:opacity-75"
                {...image}
              />
              <Heading as="h3">{title}</Heading>
              <Price
                className="text-muted-foreground"
                {...price}
              />
            </Link>
          ))}
        </Grid>
        <Prose>{children}</Prose>
      </Container>
    </Section>
  )
}

export { Collection1 }
