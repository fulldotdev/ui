import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { Logo, LogoText } from "@/components/ui/logo"
import { Section, SectionContainer } from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Footer3({
  brandName,
  brandHref,
  description,
  socials,
  columns,
  copyright,
  bottomLinks,
  navigationLabel,
  ...props
}: React.ComponentProps<"footer"> & {
  brandName: string
  brandHref: string
  description: string
  socials: {
    label: string
    href: string
    icon?: string
  }[]
  columns: {
    title: string
    links: {
      label: string
      href: string
    }[]
  }[]
  copyright: string
  bottomLinks: {
    label: string
    href: string
  }[]
  navigationLabel: string
}) {
  return (
    <footer {...props}>
      <Section className="py-16 lg:py-20">
        <SectionContainer className="flex flex-col gap-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-5">
              <Logo href={brandHref}>
                <LogoText>{brandName}</LogoText>
              </Logo>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              {socials.length > 0 && (
                <div className="flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon
                        name={social.icon}
                        href={social.href}
                        className="size-4"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title} className="flex flex-col gap-3">
                  <h2 className="text-sm font-medium">{column.title}</h2>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{copyright}</p>
            <nav
              aria-label={navigationLabel}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {bottomLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </SectionContainer>
      </Section>
    </footer>
  )
}

export { Footer3 }
