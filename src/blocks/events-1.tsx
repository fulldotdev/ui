import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileFooter,
  TileTagline,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="max-w-screen-md lg:px-12">
        {children && <SectionContent>{children}</SectionContent>}
        <div className="flex flex-col gap-4 not-first:mt-12">
          {items?.map(({ href, title, description, tagline, links }, i) => (
            <Tile className="gap-2" key={i} href={href}>
              <TileContent>
                {tagline && <TileTagline>{tagline}</TileTagline>}
                <TileTitle>{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
              {links && links.length > 0 && (
                <TileFooter>
                  {links.map(({ href, text }, i: number) => (
                    <Link
                      key={i}
                      href={href}
                      variant={i === 0 ? "outline" : "ghost"}
                      size="sm"
                    >
                      {text}
                    </Link>
                  ))}
                </TileFooter>
              )}
            </Tile>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
