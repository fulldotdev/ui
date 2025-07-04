import type { BlockProps } from "@/lib/types"
import { Heading } from "@/components/ui/heading"
import { Link } from "@/components/ui/link"
import { Prose } from "@/components/ui/prose"
import {
  Section,
  SectionContainer,
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
import { AutoForm } from "@/components/auto-form"

export default function ({
  children,
  title,
  tagline,
  image,
  socials,
  links,
  form,
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
                {socials?.map((social) => (
                  <Social key={social} href={social} />
                ))}
              </div>
              {links?.map(({ href, text }) => (
                <Link key={href} href={href} variant="outline" size="lg">
                  {text}
                </Link>
              ))}
            </TileFooter>
          </Tile>
          <Prose>{children}</Prose>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
