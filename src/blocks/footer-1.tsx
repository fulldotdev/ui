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
  hours,
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
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(30px,1fr))] justify-between gap-16 border-t py-16">
          <div className="col-span-3 flex max-w-xs flex-col">
            <Logo {...logo} />
            <p className="text-muted-foreground text-sm leading-6 not-first:mt-3">
              {description}
            </p>
            <Channels className="not-first:mt-6" {...channels} />
          </div>
          <ul className="col-span-2 flex flex-col items-start">
            <h6 className="text-foreground text-sm font-semibold not-last:mb-4">
              Openingstijden
            </h6>
            {hours?.map(({ label, value }) => (
              <li
                className="text-muted-foreground flex items-center justify-between gap-2 text-sm whitespace-nowrap not-last:mb-1"
                key={value}
              >
                <span className="w-8">{label}:</span>
                <span>10:00 - 17:30</span>
              </li>
            ))}
          </ul>
          {/* <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-8 lg:flex lg:justify-end"> */}
          {menus?.map((menu) => (
            <Menu
              className="col-span-2 basis-[192px] text-sm"
              key={uuidv4()}
              {...menu}
            />
          ))}
          {/* </div> */}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t py-4">
          {company ? (
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} {company}
            </p>
          ) : null}
          <div className="flex items-center gap-x-6 gap-y-1">
            {policies?.map(({ text, href }) => (
              <a
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                key={href}
                href={href}
              >
                {text}
              </a>
            ))}
            <Socials
              className="text-muted-foreground ml-auto"
              socials={socials}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export { Footer1 }
