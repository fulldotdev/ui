import * as React from "react"

import { Price, PriceUnit, PriceValue } from "@/components/ui/price"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Price and unit">
        <Price>
          <PriceValue price={99} />
          <PriceUnit>month</PriceUnit>
        </Price>
      </Example>
      <Example title="Currency">
        <Price>
          <PriceValue price={29} currency="EUR" />
          <PriceUnit>month</PriceUnit>
        </Price>
      </Example>
      <Example title="Compare-at price">
        <Price>
          <PriceValue price={79} compareAt={99} />
          <PriceUnit>month</PriceUnit>
        </Price>
        <Price>
          <PriceValue price={249} compareAt={299} discountFormat="amount" />
        </Price>
        <Price>
          <PriceValue price={99} compareAt={79} />
        </Price>
      </Example>
      <Example title="Range and zero">
        <Price>
          <PriceValue price={[50, 100]} />
          <PriceUnit>month</PriceUnit>
        </Price>
        <Price>
          <PriceValue price={0} />
        </Price>
        <Price>
          <PriceValue price="On request" />
        </Price>
      </Example>
      <Example title="Locale and labels">
        <Price>
          <PriceValue
            price={39}
            compareAt={49}
            currency="EUR"
            locale="nl-NL"
            discountLabel="Bespaar"
          />
          <PriceUnit>maand</PriceUnit>
        </Price>
        <Price>
          <PriceValue price={59} compareAt={79} showDiscount={false} />
        </Price>
        <Price>
          <PriceValue price={79} variant="sale" />
        </Price>
      </Example>
    </div>
  )
}
