import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/ui/header"
import { Link } from "@/components/ui/link"
import { Logo, LogoImage } from "@/components/ui/logo"
import { MainMenu } from "@/components/main-nav"
import { MobileMenu } from "@/components/mobile-nav"

export default function ({ image, menus, links }: BlockProps) {
  return (
    <Header className="z-50">
      <HeaderContainer className="flex items-center gap-2">
        {menus && menus.length > 0 && (
          <MobileMenu className="lg:hidden" items={menus} />
        )}
        {image && (
          <Logo href="/" className="mr-4 max-sm:hidden">
            {image.src && <LogoImage {...image} />}
            {image.title && image.title}
          </Logo>
        )}
        {menus && <MainMenu className="mr-auto max-lg:hidden" items={menus} />}
        {links && links.length > 0 && (
          <div className="ml-auto inline-flex flex-nowrap items-center gap-2">
            {links.map(({ text, href }, i) => (
              <Link
                className={i < links.length - 1 ? "max-sm:hidden" : ""}
                key={i}
                href={href}
                variant={i === links.length - 1 ? "outline" : "ghost"}
              >
                {text}
              </Link>
            ))}
          </div>
        )}
      </HeaderContainer>
    </Header>
  )
}
