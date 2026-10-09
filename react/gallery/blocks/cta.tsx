import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta1 } from "@/components/blocks/cta-1"
import { Cta2 } from "@/components/blocks/cta-2"
import { Cta3 } from "@/components/blocks/cta-3"
import { Cta4 } from "@/components/blocks/cta-4"
import { Cta5 } from "@/components/blocks/cta-5"
import { Cta6 } from "@/components/blocks/cta-6"
import { Cta7 } from "@/components/blocks/cta-7"
import { Cta8 } from "@/components/blocks/cta-8"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "cta-1": () => {
    return (
      <>
        <Cta1
          title="Give every launch page a decisive close"
          description="Use a centered CTA when the rest of the page already did the explaining and the final section needs one clear invitation."
          buttons={[
            { label: "Start project", href: "/docs/" },
            { label: "Browse components", href: "/components/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
              { image: placeholderImage, initials: "AR" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
        />
      </>
    )
  },
  "cta-2": () => {
    return (
      <>
        <Cta2
          title="Turn your component inventory into complete pages"
          description="A split CTA works well when the message needs a little more narrative and the actions should stay visually distinct."
          buttons={[
            { label: "See block library", href: "/blocks/" },
            { label: "Install primitives", href: "/docs/installation/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
        />
      </>
    )
  },
  "cta-3": () => {
    return (
      <>
        <Cta3
          title="Build one block language for docs and marketing"
          description="This spread CTA is useful at the end of feature sections or product comparisons where the surface should feel contained yet spacious."
          buttons={[
            { label: "Use Section", href: "/components/section/" },
            { label: "Inspect Card", href: "/components/card/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
              { image: placeholderImage, initials: "AR" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
        />
      </>
    )
  },
  "cta-4": () => {
    return (
      <>
        <Cta4
          title="Move from isolated examples to reusable page sections"
          description="A background-image CTA helps the final section feel like a real destination instead of just another block in the stack."
          buttons={[
            { label: "Explore blocks", href: "/blocks/" },
            { label: "Button API", href: "/components/button/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
        />
      </>
    )
  },
  "cta-5": () => {
    return (
      <>
        <Cta5
          title="A CTA with supporting proof points"
          description="Great for pages that need a little more reassurance before the final decision. The checklist reinforces the value proposition."
          features={[
            "Reusable hero sections",
            "Editorial article layouts",
            "Contact and pricing flows",
          ]}
          buttons={[
            { label: "Read the docs", href: "/docs/" },
            { label: "Feature examples", href: "/blocks/features/" },
          ]}
        />
      </>
    )
  },
  "cta-6": () => {
    return (
      <>
        <Cta6
          title="A reversed layout for visual variety"
          description="Use this version when the page needs a different rhythm. The image leads, giving the text a supporting role."
          buttons={[
            { label: "Browse blocks", href: "/blocks/" },
            { label: "Component docs", href: "/components/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
        />
      </>
    )
  },
  "cta-7": () => {
    return (
      <>
        <Cta7
          title="Create launch sections everyone can reuse"
          description="This centered CTA with a tinted background works when the section needs to feel distinct from the surrounding content without being too bold."
          buttons={[
            { label: "Layout docs", href: "/components/layout/" },
            { label: "Sidebar docs", href: "/components/sidebar/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "SV" },
              { image: placeholderImage, initials: "JD" },
              { image: placeholderImage, initials: "MK" },
              { image: placeholderImage, initials: "AR" },
            ],
            count: "+120",
            text: "Example: join 120 customers",
          }}
        />
      </>
    )
  },
  "cta-8": () => {
    return (
      <>
        <Cta8
          title="Choose a CTA pattern that matches the weight of the decision"
          description="Some pages need a bold final section. Others only need a quiet nudge. This minimal version with a subtle glow works for the latter."
          buttons={[
            { label: "Hero variants", href: "/blocks/hero/" },
            { label: "Pricing variants", href: "/blocks/pricing/" },
          ]}
        />
      </>
    )
  },
}

export default demos
