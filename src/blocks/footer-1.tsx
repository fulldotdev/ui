import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import type { BlockSchema } from "@/schemas/block"
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
  menus,
  company,
  policies,
  className,
  ...props
}: BlockSchema & React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "footer bg-background relative mt-auto w-full justify-end justify-self-end",
        className
      )}
      {...props}
    >
      <Container className="flex flex-col">
        <div className="flex flex-col justify-between gap-16 border-t py-16 lg:flex-row">
          <div className="flex max-w-xs flex-col">
            <Logo {...logo} />
            <p className="text-muted-foreground text-sm leading-6 not-first:mt-3">
              {description}
            </p>
            <Channels className="not-first:mt-6" {...channels} />
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8">
            {menus?.map((menu) => (
              <Menu className="text-sm" key={uuidv4()} {...menu} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t py-4">
          <div className="flex gap-x-6 gap-y-1">
            {company ? (
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} {company}
              </p>
            ) : null}
            {policies?.map(({ text, href }) => (
              <a
                className="text-muted-foreground hover:text-foreground text-xs"
                key={href}
                href={href}
              >
                {text}
              </a>
            ))}
          </div>
          <Socials
            className="text-muted-foreground ml-auto"
            socials={socials}
          />
        </div>
      </Container>
    </footer>
  )
}

export { Footer1 }
