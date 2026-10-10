import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { Logo, LogoText } from "@/components/ui/logo"
import { Section, SectionContainer } from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"

function Footer2({
  brandName,
  brandHref,
  description,
  links,
  socials,
  copyright,
  navigationLabel,
  ...props
}: React.ComponentProps<"footer"> & {
  brandName: string
  brandHref: string
  description: string
  links: {
    label: string
    href: string
  }[]
  socials: {
    label: string
    href: string
    icon?: string
  }[]
  copyright: string
  navigationLabel: string
}) {
  return (
    <footer {...props}>
      <Section className="py-12 lg:py-16">
        <SectionContainer className="flex flex-col items-center gap-8 text-center">
          <Logo href={brandHref}>
            <LogoText>{brandName}</LogoText>
          </Logo>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <nav
            aria-label={navigationLabel}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {socials.length > 0 && (
            <div className="flex items-center justify-center gap-3">
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
          <Separator />
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </SectionContainer>
      </Section>
    </footer>
  )
}

export { Footer2 }
