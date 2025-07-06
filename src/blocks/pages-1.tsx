import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent>{children}</SectionContent>}
        {links && links.length > 0 && (
          <SectionFooter className="not-first:mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                key={i}
                href={href}
                variant={i === 0 ? "default" : "ghost"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ title, description, image, href }, i) => (
            <Tile className="gap-2" key={i} href={href}>
              <TileImage className="aspect-4/3 object-cover" {...image} />
              <TileContent>
                <TileTitle>{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
