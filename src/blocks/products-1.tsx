import { Abstract } from '@/components/abstract'
import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Image } from '@/components/image'
import { Link } from '@/components/link'
import { Price } from '@/components/price'
import { Section } from '@/components/section'
import { Writeup } from '@/components/writeup'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  level?: React.ComponentProps<typeof Writeup>['level']
  size?: React.ComponentProps<typeof Writeup>['size']
  align?: React.ComponentProps<typeof Writeup>['align']
  title?: React.ComponentProps<typeof Writeup>['title']
  description?: React.ComponentProps<typeof Writeup>['description']
  children?: React.ComponentProps<typeof Writeup>['children']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  products?: {
    href?: string
    title?: string
    images?: React.ComponentProps<typeof Image>[]
    price?: React.ComponentProps<typeof Price>
  }[]
}

function Products1({ level, size, align, title, description, children, buttons, products }: Props) {
  return (
    <Section className="products products-1">
      <Container
        className="gap-8"
        align={align}
      >
        <Writeup
          level={level}
          size={size}
          align={align}
          title={title}
          description={description}
          children={children}
        />
        <Buttons
          className="max-sm:hidden"
          size={size}
          align={align}
          buttons={buttons}
        />
        <Grid className="mt-8 first:mt-0 gap-y-8 gap-x-4">
          {products?.map(({ href, title, images, price }) => (
            <Link
              className="group flex flex-col gap-4"
              key={uuidv4()}
              href={href}
            >
              <Image
                className="bg-card aspect-square rounded-md object-contain transition-opacity group-hover:opacity-75 bg-muted p-4 ring-1 ring-muted"
                {...images?.[0]}
              />
              <Abstract
                size="xs"
                level={level}
                title={title}
              >
                <Price
                  className="text-sm text-muted-foreground"
                  {...price}
                />
              </Abstract>
            </Link>
          ))}
        </Grid>
        <Buttons
          className="sm:hidden"
          buttons={buttons}
        />
      </Container>
    </Section>
  )
}

export { Products1 }
