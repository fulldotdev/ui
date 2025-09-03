import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/elements/link"
import { List, ListItem } from "@/components/elements/list"
import {
  Container,
  Section,
  SectionContent,
  SectionGrid,
} from "@/components/elements/section"
import { Tile, TileContent, TileTitle } from "@/components/elements/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <Container>
        {children && <SectionContent>{children}</SectionContent>}
        {links && links.length > 0 && (
          <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
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
          </div>
        )}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ title, list, href }, i) => (
            <Tile className="break-inside-avoid" key={i} href={href}>
              <TileContent>
                <TileTitle>{title}</TileTitle>
                {list && list.length > 0 && (
                  <List className="mt-3">
                    {list.map((item: string, j: number) => (
                      <ListItem className="text-sm" key={j}>
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </Container>
    </Section>
  )
}
