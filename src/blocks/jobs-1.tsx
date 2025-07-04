import { Check } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import { List, ListItem } from "@/components/ui/list"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import { Tile, TileContent, TileTitle } from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        {links && links.length > 0 && (
          <div className="inline-flex flex-wrap gap-2 not-first:mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                key={href}
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
          {items?.map(({ title, list, href }) => (
            <Tile className="break-inside-avoid" href={href} key={title}>
              <TileContent>
                <TileTitle>{title}</TileTitle>
                {list && list.length > 0 && (
                  <List className="mt-3">
                    {list.map((item) => (
                      <ListItem className="text-sm" key={item}>
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
