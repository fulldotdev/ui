import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icon from "@/components/elements/icon"
import Link from "@/components/elements/link"
import Links from "@/components/elements/links"
import List from "@/components/elements/list"
import Writeup from "@/components/elements/writeup"

interface Props {
  className?: string
  align?: "start" | "center" | "end"
  size?: "sm" | "default" | "lg"
  links?: React.ComponentProps<typeof Links>["links"]
  pricings?: {
    title?: string
    description?: string
    icon?: string
    list?: string[]
    link?: React.ComponentProps<typeof Link>
    price?: string
    unit?: string
  }[]
  children?: React.ReactNode
}

export default function ({
  className,
  align = "center",
  size = "default",
  links,
  pricings,
  children,
}: Props) {
  return (
    <section className={cn("py-16", className)}>
      <div
        className={cn("container flex flex-col items-center", {
          "items-start text-start": align === "start",
          "items-center text-center": align === "center",
          "items-end text-end": align === "end",
        })}
      >
        <Writeup className="not-first:mt-4" size={size}>
          {children}
        </Writeup>
        <Links className="not-first:mt-8" size={size} links={links} />
        {pricings && pricings.length > 0 && (
          <div className="flex flex-col items-stretch gap-6 not-first:mt-16 md:flex-row">
            {pricings?.map(
              ({ title, description, icon, link, list, price, unit }, i) => (
                <Card
                  className="min-w-4xs basis-4xs flex max-w-md flex-col justify-start text-left"
                  key={i}
                >
                  <CardHeader className="flex flex-col items-start text-start">
                    <Icon name={icon} />
                    {title && (
                      <CardTitle className="not-first:mt-3">{title}</CardTitle>
                    )}
                    {description && (
                      <CardDescription className="text-muted-foreground text-base not-first:mt-2">
                        {description}
                      </CardDescription>
                    )}
                    {(price || unit) && (
                      <div className="font-semibold not-first:mt-4">
                        {price && (
                          <span className="text-foreground text-3xl">
                            {price}
                          </span>
                        )}
                        {unit && (
                          <span className="text-muted-foreground ml-1.5 text-base">
                            {unit}
                          </span>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <List list={list} className="not-first:mt-4" />
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link className="w-full" size={size} {...link} />
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}
