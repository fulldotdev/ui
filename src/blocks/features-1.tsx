import type { BlockProps } from "@/lib/types"
import { Icon } from "@/components/ui/icon"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
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
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center">{children}</SectionContent>
        )}
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ text, href }, i) => (
              <Link key={i} href={href} variant={i === 0 ? "default" : "ghost"}>
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <div className="mt-16 flex flex-wrap justify-center gap-16">
          {items?.map(({ title, description, icon }, i) => (
            <Tile
              className="flex max-w-md min-w-2xs grow-1 basis-xs flex-col items-center"
              key={i}
              panel={false}
            >
              <TileContent className="flex flex-col items-center">
                {icon && <Icon className="text-primary" name={icon} />}
                <TileTitle className="mt-3 text-center text-lg">
                  {title}
                </TileTitle>
                {description && (
                  <TileDescription className="mt-2 text-center text-base/7">
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
