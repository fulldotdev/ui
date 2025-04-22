import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Gallery } from "@/components/gallery"
import { Image } from "@/components/image"
import { Price } from "@/components/price"
import { Prose } from "@/components/prose"
import { ShopifyProduct } from "@/components/shopify-product"
import { Title } from "@/components/title"

export interface Product1Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
  description?: string
  list?: string[]
  images?: React.ComponentProps<typeof Gallery>["images"]
  price?: React.ComponentProps<typeof Price>
  id?: string
  variants?: React.ComponentProps<typeof ShopifyProduct>["variants"]
  energyLabel?: string
  form?: React.ComponentProps<typeof Form>
  children?: React.ReactNode
}

function Product1({
  level = 1,
  title,
  description,
  list,
  images,
  price,
  id,
  variants,
  energyLabel,
  form,
  children,
  className,
  ...props
}: Product1Props) {
  return (
    <section
      className={cn("product product-1 relative w-full pt-0", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 max-sm:px-0 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Gallery
            className="ring-muted sm:mt-12 sm:rounded-md sm:ring"
            images={images}
          />
          <div className="top-header flex flex-col gap-6 max-sm:px-4 md:mt-12 lg:sticky">
            <Title size="3xl" level={level}>
              {title}
            </Title>
            {description && (
              <Description className="text-muted-foreground text-sm not-first:mt-4">
                {description}
              </Description>
            )}
            {energyLabel && (
              <Image
                src={energyLabel}
                alt="Energie label"
                className="h-8 w-auto not-first:mt-4"
              />
            )}
            {id && variants ? (
              <ShopifyProduct id={id} variants={variants} />
            ) : (
              <>
                {price && (
                  <Price
                    className="text-lg font-medium not-first:mt-6"
                    {...price}
                  />
                )}
                {form && <Form className="gap-2 not-first:mt-6" {...form} />}
              </>
            )}
            {list && list.length > 0 && (
              <ul className="text-muted-foreground flex flex-col gap-3 text-sm not-first:mt-4">
                {list.map((item) => (
                  <li className="flex gap-2 leading-4" key={item}>
                    <CheckIcon className="text-primary size-4" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {children && (
              <Prose className="text-foreground/80 -mt-2">{children}</Prose>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Product1 }
