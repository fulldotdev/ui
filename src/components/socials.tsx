import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiTiktok,
  SiTwitch,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<'div'> {
  socials?: string[]
}

function Socials({ className, socials, ...props }: Props) {
  return socials ? (
    <div
      className={cn('socials inline-flex gap-0.5', className)}
      {...props}
    >
      {socials.map((social) => (
        <Button
          key={uuidv4()}
          variant="ghost"
          size="icon"
          asChild
        >
          <a
            href={social}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground"
          >
            {social.includes('x.com') && <SiX />}
            {social.includes('facebook') && <SiFacebook />}
            {social.includes('instagram') && <SiInstagram />}
            {social.includes('youtube') && <SiYoutube />}
            {social.includes('tiktok') && <SiTiktok />}
            {social.includes('twitch') && <SiTwitch />}
            {social.includes('github') && <SiGithub />}
            {social.includes('discord') && <SiDiscord />}
          </a>
        </Button>
      ))}
    </div>
  ) : null
}

export { Socials }
