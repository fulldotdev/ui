import * as React from "react"
import { cn } from "cn"

import { Logo, LogoText } from "@/components/ui/logo"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Logos1({
  title,
  description,
  brands,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  brands: {
    name: string
    href?: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </div>
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
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

export { Logos1 }
