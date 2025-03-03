import { Channels } from '@/components/channels'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Logo } from '@/components/logo'
import { Menu } from '@/components/menu'
import { Socials } from '@/components/socials'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<'footer'> {
  logo?: React.ComponentProps<typeof Logo>
  description?: string
  socials?: React.ComponentProps<typeof Socials>['socials']
  channels?: React.ComponentProps<typeof Channels>
  hours?: Record<string, string>
  menus?: React.ComponentProps<typeof Menu>[]
}

function Footer({ logo, description, socials, channels, hours, menus, className, ...props }: Props) {
  return (
    <footer
      className={cn(
        'footer bg-background relative mt-auto w-full justify-end justify-self-end border-t py-16',
        className
      )}
      {...props}
    >
      <Container className="flex justify-between gap-16">
        <Grid className="w-full gap-8">
          <div className="flex max-w-xs flex-col gap-2">
            <Logo {...logo} />
            <p className="text-muted-foreground text-sm leading-6">{description}</p>
            <Socials
              className="-ml-2 mt-3"
              socials={socials}
            />
          </div>
          <Channels {...channels} />
          {hours && (
            <div className="flex flex-col items-start gap-2">
              <h6 className="text-sm font-medium">Openingstijden</h6>
              <ul className="text-muted-foreground flex flex-col justify-between gap-0.5 text-sm">
                {Object.entries(hours || {}).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex items-center justify-between gap-3"
                  >
                    <span>{key}.</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {menus?.map((menu) => (
            <Menu
              className="text-sm"
              key={uuidv4()}
              {...menu}
            />
          ))}
        </Grid>
      </Container>
    </footer>
  )
}

export { Footer }
