import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileImage,
  TileTagline,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center">{children}</SectionContent>
        )}
        <div className="flex flex-wrap justify-center gap-16 not-first:mt-16">
          {items?.map(({ href, image, title, tagline }, i) => (
            <Tile key={i} href={href} panel={false}>
              <TileImage
                className="aspect-square !rounded-full object-cover"
                alt={`${title} ${tagline}`}
                {...image}
              />
              <TileContent>
                <TileTitle>{title}</TileTitle>
                <TileTagline className="text-muted-foreground text-center text-sm">
                  {tagline}
                </TileTagline>
              </TileContent>
            </Tile>
          ))}
        </div>
      </Container>
    </Section>
  )
}
