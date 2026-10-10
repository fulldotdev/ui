import * as React from "react"
import { cn } from "cn"

import { Logo, LogoText } from "@/components/ui/logo"
import { Section, SectionContainer } from "@/components/ui/section"

function Logos3({
  className,
  brands,
  ...props
}: React.ComponentProps<"section"> & {
  brands: {
    name: string
    href?: string
  }[]
}) {
  return (
    <Section className={cn("py-12 lg:py-16", className)} {...props}>
      <SectionContainer>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
          {brands.map((brand) => (
            <li key={brand.name}>
              <Logo
                href={brand.href}
                className={cn(
                  brand.href != null &&
                    "transition-colors hover:text-foreground focus-visible:text-foreground"
                )}
              >
                <LogoText>{brand.name}</LogoText>
              </Logo>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Logos3 }
