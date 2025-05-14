import * as React from "react"
import { CheckIcon } from "lucide-react"

import type { BlockSchema } from "@/schemas/block"
import { cn, money } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Prose } from "@/components/ui/prose"
import { Form } from "@/components/form"
import { Gallery } from "@/components/gallery"
import { ShopifyProduct } from "@/components/shopify-product"

function Product1({
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
}: BlockSchema & React.ComponentProps<"section">) {
  return (
    <section
      className={cn("product product-1 relative w-full pt-0 pb-16", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 max-sm:px-0 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {images && (
            <Gallery
              className="ring-muted sm:mt-12 sm:rounded-md sm:ring"
              images={images}
            />
          )}
          <div className="top-header flex flex-col gap-6 max-sm:px-4 md:mt-12 lg:sticky">
            <Heading size="3xl" as="h1">
              {title}
            </Heading>
            {description && (
              <Paragraph className="text-muted-foreground text-sm not-first:mt-4">
                {description}
              </Paragraph>
            )}
            {energyLabel && (
              <img
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
                  <div className="text-lg font-medium not-first:mt-6">
                    {money(price, "EUR", "nl-NL")}
                  </div>
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
