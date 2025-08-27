import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
  SectionSplit,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, tagline, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col">
        <SectionSplit sticky={true}>
          <div className="flex flex-col lg:col-span-2">
            {tagline && (
              <span className="text-accent-foreground text-sm font-medium">
                {tagline}
              </span>
            )}
            {children && (
              <SectionContent className="not-first:mt-4" size="lg">
                {children}
              </SectionContent>
            )}
          </div>
          <SectionGrid className="grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 lg:col-span-3">
            {items?.map(({ title, description, icon }, i) => (
              <Tile key={i} panel={false}>
                <TileContent className="items-start">
                  {icon && (
                    <div className="bg-accent rounded-full p-3">
                      <Icon name={icon} />
                    </div>
                  )}
                  <TileTitle className="text-lg not-first:mt-2">
                    {title}
                  </TileTitle>
                  {description && (
                    <TileDescription>{description}</TileDescription>
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
