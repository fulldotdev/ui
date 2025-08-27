import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionContent,
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
      <SectionContainer className="flex flex-col items-center">
        {tagline && (
          <span className="text-accent-foreground text-sm font-medium">
            {tagline}
          </span>
        )}
        {children && (
          <SectionContent className="text-center not-first:mt-4" size="lg">
            {children}
          </SectionContent>
        )}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 not-first:mt-16">
          {items?.map(({ title, description, icon }, i) => (
            <Tile
              className="flex max-w-md min-w-2xs grow-1 basis-2xs flex-col items-center"
              key={i}
              panel={false}
            >
              <TileContent className="flex flex-col items-center text-center">
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
        </div>
      </SectionContainer>
    </Section>
  )
}
