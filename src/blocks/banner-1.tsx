import * as React from "react"
import type { BannerProps } from "@/schemas/blocks/banner"
import { ChevronRight } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Link } from "@/components/link"

function Banner1({
  items,
  className,
  ...props
}: BannerProps & React.ComponentProps<"header">) {
  return items ? (
    <header
      className={cn(
        "banner bg-primary text-primary-foreground relative z-10 flex h-8 items-center text-center text-sm leading-3.5 font-medium",
        className
      )}
      {...props}
    >
      <Container className="flex items-center justify-evenly text-xs">
        {items?.map((item, i) =>
          typeof item === "string" ? (
            <span
              key={uuidv4()}
              className={cn({
                "max-md:hidden": i > 0,
                "max-lg:hidden": i > 1,
                "max-xl:hidden": i > 2,
                hidden: i > 3,
              })}
            >
              {item}
            </span>
          ) : (
            <Link
              key={uuidv4()}
              className={cn("group", {
                "max-md:hidden": i > 0,
                "max-lg:hidden": i > 1,
                "max-xl:hidden": i > 2,
                hidden: i > 3,
              })}
              href={item.href}
            >
              {item.text}
              <ChevronRight className="ml-0.5 inline-flex size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )
        )}
      </Container>
      <style>
        {`
          :root {
            --banner-height: calc(var(--spacing) * 8);
          }
        `}
      </style>
    </header>
  ) : null
}

export { Banner1 }
