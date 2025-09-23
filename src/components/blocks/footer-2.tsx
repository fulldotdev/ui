import Links from "@/components/elements/links"
import Logo from "@/components/elements/logo"
import Social from "@/components/elements/social"

interface Props {
  logo?: React.ComponentProps<typeof Logo>
  description?: string
  links?: React.ComponentProps<typeof Links>["links"]
  socials?: string[]
  menus?: {
    text?: string
    links?: React.ComponentProps<typeof Links>["links"]
  }[]
}

export default function ({ logo, links, socials }: Props) {
  return (
    <section className="py-16">
      <div className="container flex flex-col items-center gap-8">
        <Logo href="/" {...logo} />
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {links?.map(({ text, href }, i) => (
              <a
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                key={i}
                href={href}
              >
                {text}
              </a>
            ))}
          </div>
        )}
        {socials && socials.length > 0 && (
          <div className="flex gap-4">
            {socials?.map((social, i) => (
              <Social
                className="text-muted-foreground hover:text-foreground !size-auto"
                key={i}
                variant="link"
                href={social}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
