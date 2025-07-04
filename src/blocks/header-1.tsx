import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/ui/header"
import { Link } from "@/components/ui/link"
import { Logo, LogoImage } from "@/components/ui/logo"
import { MainMenu } from "@/components/main-nav"
import { MobileMenu } from "@/components/mobile-nav"

export default function ({ logo, menus, links }: BlockProps) {
  return (
    <Header>
      <HeaderContainer>
        <div className="flex items-center gap-2">
          {menus && menus.length > 0 && (
            <MobileMenu className="lg:hidden" items={menus} />
          )}
          {logo && (
            <Logo href="/" className="mr-4 max-sm:hidden">
              {logo.src && <LogoImage {...logo} />}
              {logo.title && logo.title}
            </Logo>
          )}
          {menus && (
            <MainMenu className="max-xl:-ml-3 max-lg:hidden" items={menus} />
          )}
        </div>
        {links && links.length > 0 && (
          <div className="inline-flex flex-nowrap items-center gap-2">
            {links.map(({ text, href }, i) => (
              <Link
                className={i < links.length - 1 ? "max-sm:hidden" : ""}
                key={i}
                href={href}
                variant={i === links.length - 1 ? "default" : "ghost"}
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
