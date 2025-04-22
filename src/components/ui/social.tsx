import * as React from "react"
import {
  SiBehance,
  SiDiscord,
  SiDribbble,
  SiFacebook,
  SiFlickr,
  SiGithub,
  SiInstagram,
  SiPinterest,
  SiReddit,
  SiSnapchat,
  SiSoundcloud,
  SiSpotify,
  SiTelegram,
  SiTiktok,
  SiTumblr,
  SiTwitch,
  SiVimeo,
  SiWhatsapp,
  SiX,
  SiYelp,
  SiYoutube,
} from "@icons-pack/react-simple-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Social({
  className,
  href,
  ...props
}: React.ComponentProps<"button"> & {
  href?: string
}) {
  return (
    <Button
      className={cn("social", className)}
      variant="ghost"
      size="icon"
      asChild
      {...props}
    >
      <a href={href}>
        {href?.includes("x.com") && <SiX />}
        {href?.includes("twitter") && <SiX />}
        {href?.includes("facebook") && <SiFacebook />}
        {href?.includes("instagram") && <SiInstagram />}
        {href?.includes("pinterest") && <SiPinterest />}
        {href?.includes("youtube") && <SiYoutube />}
        {href?.includes("tiktok") && <SiTiktok />}
        {href?.includes("snapchat") && <SiSnapchat />}
        {href?.includes("reddit") && <SiReddit />}
        {href?.includes("tumblr") && <SiTumblr />}
        {href?.includes("whatsapp") && <SiWhatsapp />}
        {href?.includes("telegram") && <SiTelegram />}
        {href?.includes("discord") && <SiDiscord />}
        {href?.includes("vimeo") && <SiVimeo />}
        {href?.includes("flickr") && <SiFlickr />}
        {href?.includes("yelp") && <SiYelp />}
        {href?.includes("spotify") && <SiSpotify />}
        {href?.includes("behance") && <SiBehance />}
        {href?.includes("dribbble") && <SiDribbble />}
        {href?.includes("soundcloud") && <SiSoundcloud />}
        {href?.includes("github") && <SiGithub />}
        {href?.includes("twitch") && <SiTwitch />}
      </a>
    </Button>
  )
}

export { Social }
