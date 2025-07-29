import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
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
      <SectionContainer>
        {tagline && (
          <span className="text-accent-foreground text-sm font-medium">
            {tagline}
          </span>
        )}
        {children && (
          <SectionContent className="not-first:mt-4">{children}</SectionContent>
        )}
        <SectionGrid className="gap-8 not-first:mt-16">
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
                  <TileDescription className="text-base">
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
