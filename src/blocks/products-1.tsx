import { Box } from '@/components/box'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Price } from '@/components/price'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  products?: {
    href?: string
    title?: string
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price>
  }[]
  children?: React.ReactNode
}

function Products1({ buttons, products, children }: Props) {
  return (
    <Section className="products products-1">
      <Container className="flex flex-col items-center gap-16">
        <Box className="flex flex-col items-center gap-8">
          <Writeup className="flex w-full items-center text-center justify-between">{children}</Writeup>
          <Buttons
            className="max-lg:hidden"
            buttons={buttons}
          />
        </Box>
        <Grid
          length={products?.length}
          className="gap-x-4 gap-4-8"
        >
          {products?.map(({ href, title, images, price }) => (
            <Link
              className="group flex flex-col"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card aspect-square rounded-md object-contain transition-opacity group-hover:opacity-75 bg-muted p-4 ring-1 ring-muted"
                {...images?.[0]}
              />
              <Heading
                as="h3"
                className="text-sm mt-5 mb-1"
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
        <Buttons
          className="hidden"
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Products1 }
