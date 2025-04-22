import { Check, CheckIcon } from "lucide-react"

import { cn, money } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { List, ListItem } from "@/components/ui/list"
import { Paragraph } from "@/components/ui/paragraph"

export interface Pricings1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  items: {
    title: string
    description?: string
    price?: number
    list?: string[]
    button?: {
      text: string
      href: string
    }
  }[]
}

function Pricings1({
  className,
  level = 2,
  title,
  description,
  items,
  ...props
}: Pricings1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && (
            <Paragraph className="not-first:mt-4" size="lg">
              {description}
            </Paragraph>
          )}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 not-first:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {items?.map(({ title, description, price, list, button }) => (
              <div className="flex flex-col rounded-md border p-8" key={title}>
                <Heading level={level + 1} size="xl">
                  {title}
                </Heading>
                {description && (
                  <Paragraph className="mt-3">{description}</Paragraph>
                )}
                {price && (
                  <div className="mt-4 text-2xl font-medium">
                    {money(price)}
                  </div>
                )}
                {list && list.length > 0 && (
                  <List className="mt-6 text-sm">
                    {list.map((item) => (
                      <ListItem key={item}>
                        <Check className="text-primary" />
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
                {button && (
                  <Button className="mt-8" asChild>
                    <a href={button.href}>{button.text}</a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Pricings1 }
