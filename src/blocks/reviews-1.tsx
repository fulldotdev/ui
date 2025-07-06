import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionMasonry,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"
import { Rating } from "@/components/rating"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col">
        <SectionContent>{children}</SectionContent>
        <SectionMasonry className="gap-4 space-y-6 not-first:mt-12">
          {items?.map(({ title, description, rating, avatar, image }, i) => (
            <Tile key={i}>
              <TileImage {...image} />
              <TileContent>
                <div className="flex w-full items-center gap-4">
                  {avatar?.src && (
                    <img
                      className="size-12 shrink-0 grow-0 rounded-full object-cover"
                      {...avatar}
                    />
                  )}
                  <div className="flex w-full flex-col gap-3">
                    {rating && <Rating score={rating} />}
                    <TileTitle>{title}</TileTitle>
                  </div>
                </div>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionMasonry>
      </SectionContainer>
    </Section>
  )
}
