import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"
import { Rating } from "@/components/rating"

export default function ({
  children,
  links,
  image,
  rating,
  tagline,
  avatars,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {rating && tagline && avatars && (
          <div className="flex items-center">
            {avatars?.map((avatar, i) => (
              <img
                className="size-10 rounded-full object-cover not-first:-ml-4"
                key={i}
                alt={`Avatar ${i + 1}`}
                {...avatar}
              />
            ))}
            <div className="flex flex-col gap-1 not-first:ml-3.5">
              <Rating score={rating} />
              <span className="text-muted-foreground text-sm">{tagline}</span>
            </div>
          </div>
        )}
        <SectionContent
          size="xl"
          className="text-center text-balance not-first:mt-5"
        >
          {children}
        </SectionContent>
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                key={i}
                href={href}
                variant={i === 0 ? "default" : "ghost"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        {image && <img className="rounded-lg not-first:mt-16" {...image} />}
      </SectionContainer>
    </Section>
  )
}
