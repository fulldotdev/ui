import { Box } from '@/components/box'
import { Channels } from '@/components/channels'
import { Container } from '@/components/container'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Logo } from '@/components/logo'
import { Menu } from '@/components/menu'
import { Paragraph } from '@/components/paragraph'
import { Socials } from '@/components/socials'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ComponentProps<typeof Logo>
  description?: string
  socials?: React.ComponentProps<typeof Socials>['socials']
  channels?: React.ComponentProps<typeof Channels>
  hours?: Record<string, string>
  menus?: React.ComponentProps<typeof Menu>[]
}

function Footer({ logo, description, socials, channels, hours, menus, className, ...props }: Props) {
  return (
    <Box
      className={cn(
        'footer bg-background relative mt-auto w-full justify-end justify-self-end border-t py-16',
        className
      )}
      {...props}
    >
      <Container className="flex justify-between gap-16">
        <Grid
          length={5}
          className="w-full gap-8"
        >
          <Box className="flex max-w-xs flex-col gap-2">
            <Logo {...logo} />
            <Paragraph className="text-muted-foreground text-sm leading-6">{description}</Paragraph>
            <Socials
              className="-ml-2 mt-3"
              socials={socials}
            />
          </Box>
          <Channels {...channels} />
          {hours && (
            <Box className="flex flex-col items-start gap-2">
              <Heading
                as="h6"
                className="text-sm"
              >
                Openingstijden
              </Heading>
              <Box
                as="ul"
                className="text-muted-foreground flex flex-col justify-between gap-0.5 text-sm"
              >
                {Object.entries(hours || {}).map(([key, value]) => (
                  <Box
                    key={key}
                    as="li"
                    className="flex items-center justify-between gap-3"
                  >
                    <Box as="span">{key}.</Box>
                    <Box as="span">{value}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
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
    </Box>
  )
}

export { Footer }
