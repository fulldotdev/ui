import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import { List, ListItem } from "@/components/ui/list"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionProse,
  SectionSplit,
} from "@/components/ui/section"

export default function ({
  children,
  title,
  published,
  description,
  links,
  list,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <SectionSplit className="gap-y-16">
          <div className="top-24 flex flex-col lg:sticky">
            <SectionContent size="4xl">
              {published && (
                <span>{new Date(published).toLocaleDateString("nl-NL")}</span>
              )}
              {title && <h1>{title}</h1>}
              {description && (
                <p className="text-muted-foreground mt-4">{description}</p>
              )}
            </SectionContent>
            {list && list.length > 0 && (
              <List className="mt-3">
                {list.map((item) => (
                  <ListItem className="text-sm" key={item}>
                    {item}
                  </ListItem>
                ))}
              </List>
            )}
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text }, i) => (
                  <Link
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          <div className="flex flex-col">
            <SectionProse>{children}</SectionProse>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8 md:hidden">
                {links.map(({ href, text }, i) => (
                  <Link
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
