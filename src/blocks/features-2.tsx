import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
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
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent>{children}</SectionContent>}
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ text, href }, i) => (
              <Link key={i} href={href} variant={i === 0 ? "default" : "ghost"}>
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <SectionGrid className="not-first:mt-16">
          {items?.map(({ title, description, icon }, i) => (
            <Tile className="gap-2" key={i} panel={false}>
              <TileContent>
                {icon && <Icon name={icon} className="text-primary" />}
                <TileTitle className="mt-3 text-lg">{title}</TileTitle>
                {description && (
                  <TileDescription className="mt-2 text-base/7">
                    {description}
                  </TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
