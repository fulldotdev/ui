import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero1 } from "@/components/blocks/hero-1"
import { Hero2 } from "@/components/blocks/hero-2"
import { Hero3 } from "@/components/blocks/hero-3"
import { Hero4 } from "@/components/blocks/hero-4"
import { Hero5 } from "@/components/blocks/hero-5"
import { Hero6 } from "@/components/blocks/hero-6"
import { Hero7 } from "@/components/blocks/hero-7"
import { Hero8 } from "@/components/blocks/hero-8"
import { Hero9 } from "@/components/blocks/hero-9"
import { Hero10 } from "@/components/blocks/hero-10"
import { Hero11 } from "@/components/blocks/hero-11"
import { Hero12 } from "@/components/blocks/hero-12"
import { Hero13 } from "@/components/blocks/hero-13"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "hero-1": () => {
    return (
      <>
        <Hero1
          title="Build React pages from reusable content sections"
          description="Production-ready hero blocks, feature grids, and pricing layouts that drop into any React project."
          badge={{ label: "New in v0.9", href: "/docs/" }}
          buttons={[
            { label: "Browse docs", href: "/docs/" },
            { label: "See components", href: "/components/" },
          ]}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-2": () => {
    return (
      <>
        <Hero2
          title="Social proof above a clear headline"
          description="A hero with social proof at the top (avatars, rating, and a trust line), followed by a clear message and full-width image."
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "AM" },
              { image: placeholderImage, initials: "KL" },
              { image: placeholderImage, initials: "SV" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          buttons={[
            { label: "Get started", href: "/docs/" },
            { label: "View blocks", href: "/blocks/" },
          ]}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-3": () => {
    return (
      <>
        <Hero3
          title="Ship landing pages in hours, not weeks"
          description="A bold hero with text centered over a full background image. Ideal for launches, events, and product announcements."
          buttons={[
            { label: "Start building", href: "/docs/" },
            { label: "See examples", href: "/blocks/" },
          ]}
          image={{ src: placeholderImage }}
        />
      </>
    )
  },
  "hero-4": () => {
    return (
      <>
        <Hero4
          title="Full-screen impact for product launches and events"
          description="A taller version of the background image hero that fills the viewport. Includes a feature checklist for quick scanning."
          features={[
            "Zero-JS components by default",
            "React-first primitives",
            "Dark mode included",
          ]}
          buttons={[
            { label: "Learn more", href: "/docs/" },
            { label: "Contact sales", href: "#" },
          ]}
          image={{ src: placeholderImage }}
        />
      </>
    )
  },
  "hero-5": () => {
    return (
      <>
        <Hero5
          title="Everything you need to build with React"
          description="A split hero with a feature checklist, action buttons, and social proof on the left, and a product image on the right."
          features={[
            "Zero-JS components by default",
            "shadcn-compatible installation",
            "React-first primitives",
            "Fully accessible and keyboard-navigable",
          ]}
          buttons={[
            { label: "Get started", href: "/docs/" },
            { label: "Components", href: "/components/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "AM" },
              { image: placeholderImage, initials: "KL" },
              { image: placeholderImage, initials: "SV" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-6": () => {
    return (
      <>
        <Hero6
          title="The component library built for React"
          description="Split layout with features, social proof, and a side-by-side image. Works for product pages and SaaS landing pages."
          features={[
            "Ship pages faster with blocks",
            "Consistent design system tokens",
            "Dark mode included",
          ]}
          buttons={[
            { label: "Browse blocks", href: "/blocks/" },
            { label: "Documentation", href: "/docs/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "FD" },
              { image: placeholderImage, initials: "AV" },
              { image: placeholderImage, initials: "UI" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-7": () => {
    return (
      <>
        <Hero7
          title="A wider image for visual-heavy products"
          description="2:3 split with a larger image area that bleeds to the right edge. Ideal for showcasing dashboards, apps, or creative work."
          features={[
            "Large image area for product screenshots",
            "Content stays readable at all sizes",
            "Image bleeds to the edge on desktop",
          ]}
          buttons={[
            { label: "View demo", href: "#" },
            { label: "Documentation", href: "/docs/" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "AM" },
              { image: placeholderImage, initials: "KL" },
              { image: placeholderImage, initials: "SV" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-8": () => {
    return (
      <>
        <Hero8
          title="Let the image do the talking"
          description="Minimal text with maximum image. A 1:3 split where the product screenshot dominates and the message stays compact."
          buttons={[
            { label: "Get started", href: "/docs/" },
            { label: "Learn more", href: "#" },
          ]}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-9": () => {
    return (
      <>
        <Hero9
          title="Content over a masked background image"
          description="A split hero where text and features sit on the left, with a background image fading in from the right using a gradient mask."
          features={[
            "Background image with gradient mask",
            "Content stays fully readable",
            "Works in both light and dark mode",
            "Ideal for atmospheric pages",
          ]}
          buttons={[
            { label: "Explore", href: "/docs/" },
            { label: "View source", href: "#" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "AM" },
              { image: placeholderImage, initials: "KL" },
              { image: placeholderImage, initials: "SV" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage }}
        />
      </>
    )
  },
  "hero-10": () => {
    return (
      <>
        <Hero10
          title="A full-bleed background image hero with overlaid content"
          description="Content and actions spread across the top, with a full background image visible underneath through gradient masks."
          buttons={[
            { label: "Start free", href: "/docs/" },
            { label: "Book a demo", href: "#" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "FD" },
              { image: placeholderImage, initials: "AV" },
              { image: placeholderImage, initials: "UI" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage }}
        />
      </>
    )
  },
  "hero-11": () => {
    return (
      <>
        <Hero11
          title="Centered content over a full background image"
          description="Content, buttons, and social proof centered vertically over a full-bleed background image with gradient masks."
          buttons={[
            { label: "Get started", href: "/docs/" },
            { label: "View pricing", href: "#" },
          ]}
          socialProof={{
            avatars: [
              { image: placeholderImage, initials: "AM" },
              { image: placeholderImage, initials: "KL" },
              { image: placeholderImage, initials: "SV" },
            ],
            rating: 4.8,
            ratingLabel: "Rated 4.8 out of 5",
            text: "Example: 4.8 from 120 reviews",
          }}
          image={{ src: placeholderImage }}
        />
      </>
    )
  },
  "hero-12": () => {
    return (
      <>
        <Hero12
          title="A minimal editorial hero with a border bar and full-width image"
          description="Title, description, and actions spread across a bordered bar, followed by a large image below."
          buttons={[{ label: "Read the story", href: "#" }]}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
  "hero-13": () => {
    return (
      <>
        <Hero13
          title="Small text, large image"
          description="A 1:3 split where the content stays compact on the left and the image takes the dominant position on the right."
          buttons={[{ label: "View products", href: "/blocks/products/" }]}
          image={{ src: placeholderImage, alt: "" }}
        />
      </>
    )
  },
}

export default demos
