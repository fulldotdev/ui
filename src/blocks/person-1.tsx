import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionSplit,
} from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import {
  Tile,
  TileContent,
  TileDescription,
  TileFooter,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"

export default function ({
  children,
  title,
  tagline,
  image,
  socials,
  links,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit sticky={true}>
          <Tile className="flex max-w-sm flex-col">
            <TileImage
              className="aspect-square w-full object-cover"
              {...image}
            />
            <TileContent>
              <TileTitle>{title}</TileTitle>
              <TileDescription>{tagline}</TileDescription>
            </TileContent>
            <TileFooter className="flex flex-col">
              <div className="flex gap-2">
                {socials?.map((social, i) => (
                  <Social key={i} href={social} />
                ))}
              </div>
              {links?.map(({ href, text }, i) => (
                <Link key={i} href={href} variant="outline" size="lg">
                  {text}
                </Link>
              ))}
            </TileFooter>
          </Tile>
          <SectionContent>{children}</SectionContent>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
