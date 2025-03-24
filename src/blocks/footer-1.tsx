import * as React from "react"
import type { BlockSchema } from "@/schemas/block"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Container } from "@/components/container"
import { Grid } from "@/components/grid"
import { Logo } from "@/components/logo"
import { Menu } from "@/components/menu"
import { Socials } from "@/components/socials"

function Footer1({
  logo,
  description,
  socials,
  channels,
  items,
  className,
  ...props
}: BlockSchema & React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "footer bg-background relative mt-auto w-full justify-end justify-self-end border-t py-16",
        className
      )}
      {...props}
    >
      <Container className="flex justify-between gap-16">
        <Grid className="w-full gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <Logo {...logo} />
            <p className="text-muted-foreground text-sm leading-6">
              {description}
            </p>
            <Socials className="mt-3 -ml-2" socials={socials} />
          </div>
          <Channels align="start" {...channels} />
          {items?.map((menu) => (
            <Menu className="text-sm" key={uuidv4()} {...menu} />
          ))}
        </Grid>
      </Container>
    </footer>
  )
}

export { Footer1 }
