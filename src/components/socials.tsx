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

function Socials({ className, socials, ...props }: React.ComponentProps<'div'> & { socials?: string[] }) {
  return socials ? (
    <div
      className={cn('socials inline-flex gap-0.5', className)}
      {...props}
    >
      {socials.map((social, index) => (
        <Button
          key={index}
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
