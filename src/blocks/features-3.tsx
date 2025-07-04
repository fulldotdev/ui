import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
  SectionSplit,
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
      <SectionContainer className="flex flex-col">
        <SectionSplit sticky={true}>
          <div className="flex flex-col">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-8">
                {links.map(({ text, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          <SectionGrid className="grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 lg:col-span-2">
            {items?.map(({ title, description, icon }, i) => (
              <Tile className="flex flex-col" key={i} panel={false}>
                <TileContent>
                  {icon && <Icon name={icon} className="text-primary size-8" />}
                  <TileTitle className="text-xl">{title}</TileTitle>
                  {description && (
                    <TileDescription className="text-base/7">
                      {description}
                    </TileDescription>
                  )}
                </TileContent>
              </Tile>
            ))}
          </SectionGrid>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
