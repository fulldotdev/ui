import type { BlockProps } from "@/lib/types"
import {
  Container,
  Section,
  SectionContent,
} from "@/components/elements/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTitle,
} from "@/components/elements/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <Container className="max-w-screen-md lg:px-12">
        {children && <SectionContent>{children}</SectionContent>}
        <div className="flex flex-col gap-4 not-first:mt-12">
          {items?.map(({ href, title, description }, i) => (
            <Tile key={i} href={href}>
              <TileContent>
                <TileTitle>{title}</TileTitle>
                <TileDescription>{description}</TileDescription>
              </TileContent>
            </Tile>
          ))}
        </div>
      </Container>
    </Section>
  )
}
