import type { BlockProps } from "@/lib/transforms"
import { Abstract } from "@/components/elements/abstract"
import { Background } from "@/components/elements/background"
import { Chip } from "@/components/elements/chip"
import { Icon } from "@/components/elements/icon"
import { Link } from "@/components/elements/link"
import { Review } from "@/components/elements/review-old"
import { Tile } from "@/components/elements/tile"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  chip,
  rating,
  tagline,
  avatars,
  title,
  description,
  children,
  links,
  image,
  icon,
  size,
  items,
  background,
}: BlockProps) {
  return (
    <section className="relative w-full py-16">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start px-4 lg:px-8">
        {chip && <Chip {...chip} />}
        {(rating || tagline || avatars) && (
          <Review rating={rating} text={tagline} avatars={avatars} />
        )}
        {icon && <Icon className="text-primary size-8" name={icon} />}
        {(title || description || children) && (
          <Writeup className="not-first:mt-8" size={size}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
            {children}
          </Writeup>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 not-first:mt-8">
            {links?.map((link, i) => (
              <Link key={i} size={size} {...link} />
            ))}
          </div>
        )}
        {image && <img className="rounded-lg not-first:mt-16" {...image} />}
        {items && items.length > 0 && (
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8 not-first:mt-16">
            {items?.map(({ title, description, links, image, icon }, i) => (
              <Tile key={i} className="flex flex-col">
                {image && (
                  <img className="rounded-lg not-first:mt-16" {...image} />
                )}
                {icon && <Icon className="text-primary size-8" name={icon} />}
                {(title || description || children) && (
                  <Abstract className="not-first:mt-4" size={size}>
                    {title && <h1>{title}</h1>}
                    {description && <p>{description}</p>}
                  </Abstract>
                )}
                {links && links.length > 0 && (
                  <div className="flex flex-row flex-wrap not-first:mt-8">
                    {links?.map((link, i) => (
                      <Link key={i} size={size} {...link} />
                    ))}
                  </div>
                )}
              </Tile>
            ))}
          </div>
        )}
      </div>
      {background && (
        <Background
          className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
          {...background}
        />
      )}
    </section>
  )
}
