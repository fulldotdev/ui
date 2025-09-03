import type { BlockProps } from "@/lib/types"
import { Container } from "@/components/elements/container"
import { Logo, LogoImage } from "@/components/elements/logo"
import { Section } from "@/components/elements/section"
import { Social } from "@/components/elements/social"

export default function ({
  image,
  title,
  description,
  links,
  socials,
  menus,
}: BlockProps) {
  return (
    <Section className="py-0">
      <Container className="flex w-full flex-col justify-between gap-8 py-16 md:grid md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        <div className="col-span-2 flex max-w-xs flex-col">
          {(image || title) && (
            <Logo href="/">
              {image?.src && <LogoImage {...image} />}
              {title}
            </Logo>
          )}
          {description && (
            <p className="text-muted-foreground text-sm not-first:mt-3">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-col items-start gap-2 not-first:mt-8">
              {links.map((link, i) => (
                <div className="flex items-center gap-3 text-sm" key={i}>
                  <Social variant="outline" href={link.href} />
                  {link.text}
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
      </Container>
    </Section>
  )
}
