import * as React from "react"
import { cn } from "cn"

import { Logo, LogoText } from "@/components/ui/logo"
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeToggle,
} from "@/components/ui/marquee"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Logos2({
  title,
  description,
  brands,
  labels,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  brands: {
    name: string
    href?: string
  }[]
  labels: {
    play: string
    pause: string
  }
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-4 text-center">
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
      </SectionContainer>
      <Marquee className="flex flex-col gap-4 [--marquee-gap:--spacing(12)]">
        <SectionContainer className="flex justify-end">
          <MarqueeToggle playLabel={labels.play} pauseLabel={labels.pause} />
        </SectionContainer>
        <MarqueeContent className="mask-x-from-90% text-muted-foreground">
          {brands.map((brand) => (
            <MarqueeItem key={brand.name} className="flex items-center">
              <Logo
                href={brand.href}
                className={cn(
                  brand.href != null &&
                    "transition-colors hover:text-foreground focus-visible:text-foreground"
                )}
              >
                <LogoText>{brand.name}</LogoText>
              </Logo>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </Section>
  )
}

export { Logos2 }
