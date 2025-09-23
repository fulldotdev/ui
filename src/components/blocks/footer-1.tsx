import Links from "@/components/elements/links"
import Logo from "@/components/elements/logo"
import Social from "@/components/elements/social"

interface Props {
  image?: React.ComponentProps<typeof Logo>["image"]
  title?: string
  description?: string
  links?: React.ComponentProps<typeof Links>["links"]
  socials?: string[]
  menus?: {
    text?: string
    links?: React.ComponentProps<typeof Links>["links"]
  }[]
}

export default function ({
  image,
  title,
  description,
  links,
  socials,
  menus,
}: Props) {
  return (
    <section className="py-0">
      <div className="container flex w-full flex-col justify-between gap-8 py-16 md:grid md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        <div className="col-span-2 flex max-w-xs flex-col">
          <Logo href="/" title={title} {...image} />
          {description && (
            <p className="text-muted-foreground text-sm not-first:mt-3">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-col items-start gap-2 not-first:mt-8">
              {links.map(({ text, ...link }, i) => (
                <div className="flex items-center gap-3 text-sm" key={i}>
                  <Social variant="outline" href={link.href} />
                  {text}
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-4 not-first:mt-8">
            {socials?.map((social, i) => (
              <Social
                className="text-muted-foreground hover:text-foreground size-5"
                key={i}
                variant="link"
                href={social}
              />
            ))}
          </div>
        </div>
        {menus?.map((menu, i) => (
          <div className="menu flex flex-col items-start gap-4" key={i}>
            <h4 className="text-foreground text-sm font-semibold whitespace-nowrap">
              {menu.text}
            </h4>
            <menu className="flex w-full flex-col items-start gap-3">
              {menu.links?.map(({ href, text }) => (
                <a
                  className="text-muted-foreground hover:text-foreground text-sm font-normal transition-colors"
                  key={href}
                  href={href}
                >
                  {text}
                </a>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </section>
  )
}
