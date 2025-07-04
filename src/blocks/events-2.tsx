import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
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
      <SectionContainer>
        <SectionSplit sticky>
          {children && <SectionContent size="4xl">{children}</SectionContent>}
          <div className="flex flex-col gap-4">
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
                    {links.map(
                      (
                        { href, text }: { href: string; text: string },
                        j: number
                      ) => (
                        <Link
                          key={j}
                          href={href}
                          variant={j === 0 ? "outline" : "ghost"}
                          size="sm"
                        >
                          {text}
                        </Link>
                      )
                    )}
                  </TileFooter>
                )}
              </Tile>
            ))}
          </div>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
