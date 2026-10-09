import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Features1 } from "@/components/blocks/features-1"
import { Features2 } from "@/components/blocks/features-2"
import { Features3 } from "@/components/blocks/features-3"
import { Features4 } from "@/components/blocks/features-4"
import { Features5 } from "@/components/blocks/features-5"
import { Features6 } from "@/components/blocks/features-6"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "features-1": () => {
    return (
      <>
        <Features1
          title="Everything you need to build faster"
          description="A complete set of tools designed to streamline your workflow and help your team ship with confidence."
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
          features={[
            {
              icon: "zap",
              title: "Lightning fast",
              description:
                "Optimized for speed at every layer. Pages load instantly and interactions feel native.",
              link: { label: "Learn more", href: "/docs/" },
            },
            {
              icon: "layers",
              title: "Composable sections",
              description:
                "Build pages from pre-designed sections that snap together and stay consistent.",
              link: { label: "View sections", href: "/blocks/" },
            },
            {
              icon: "palette",
              title: "Token-driven theming",
              description:
                "Swap color palettes, typography, and spacing through a single token file.",
              link: { label: "Explore themes", href: "/components/" },
            },
            {
              icon: "code",
              title: "Developer friendly",
              description:
                "Clean APIs, typed props, and predictable patterns that scale with your codebase.",
              link: { label: "Read the docs", href: "/docs/installation/" },
            },
          ]}
        />
      </>
    )
  },
  "features-2": () => {
    return (
      <>
        <Features2
          title="Built for modern teams"
          description="Every component is designed to work together, so you can focus on shipping great products instead of wrestling with CSS."
          features={[
            {
              icon: "layout-grid",
              title: "Section-first workflow",
              description:
                "Start from a complete section and refine the content instead of assembling everything from raw divs.",
            },
            {
              icon: "palette",
              title: "Token-driven design",
              description:
                "The visual system stays tied to semantic color tokens and shared card treatments.",
            },
            {
              icon: "sparkles",
              title: "Preview friendly",
              description:
                "Blocks read well inside the live preview shell without losing their page-level feel.",
            },
            {
              icon: "swatch-book",
              title: "Brand adaptable",
              description:
                "Every piece can be tuned to a different identity without changing the composition model.",
            },
            {
              icon: "rocket",
              title: "Performance first",
              description:
                "Zero client-side JavaScript by default. Everything renders at build time for instant loads.",
            },
            {
              icon: "globe",
              title: "Source ready",
              description:
                "Examples remain source-driven and easy to install through the Fulldev registry.",
            },
          ]}
        />
      </>
    )
  },
  "features-3": () => {
    return (
      <>
        <Features3
          title="Designed for every screen"
          description="Horizontal cards with rich media that tell a visual story alongside the feature copy."
          features={[
            {
              title: "Responsive layouts",
              description:
                "Every section adapts gracefully from mobile to ultrawide without extra configuration.",
              image: { src: placeholderImage, alt: "" },
            },
            {
              title: "Accessible by default",
              description:
                "Semantic markup, keyboard navigation, and screen reader support built into every component.",
              image: { src: placeholderImage, alt: "" },
            },
            {
              title: "Visual consistency",
              description:
                "Shared design tokens keep spacing, color, and typography aligned across all sections.",
              image: { src: placeholderImage, alt: "" },
            },
            {
              title: "Instant previews",
              description:
                "See exactly how blocks look in context with the live preview shell.",
              image: { src: placeholderImage, alt: "" },
            },
          ]}
        />
      </>
    )
  },
  "features-4": () => {
    return (
      <>
        <Features4
          title="Why teams choose our platform"
          description="A sticky sidebar layout that keeps your headline visible while users explore feature cards at their own pace."
          buttons={[
            { label: "Get started", href: "#" },
            { label: "View docs", href: "#" },
          ]}
          features={[
            {
              icon: "layers",
              title: "Composable architecture",
              description:
                "Build pages from pre-designed sections that snap together. Mix and match hero, features, pricing, and CTA blocks.",
              link: { label: "Learn more", href: "/docs/" },
            },
            {
              icon: "shield",
              title: "Type-safe props",
              description:
                "Every component ships with TypeScript interfaces so your editor catches mistakes before the browser does.",
              link: { label: "See examples", href: "/blocks/" },
            },
            {
              icon: "rocket",
              title: "Zero JS by default",
              description:
                "Server-rendered React components mean no client bundle. Add interactivity only where you need it.",
              link: { label: "Read the docs", href: "/components/" },
            },
            {
              icon: "code",
              title: "Fulldev powered",
              description:
                "Install individual components through the shadcn CLI and the @fulldev registry. No monolithic dependency to manage.",
              link: { label: "Browse components", href: "/docs/installation/" },
            },
          ]}
        />
      </>
    )
  },
  "features-5": () => {
    return (
      <>
        <Features5
          title="A better way to build"
          description="Clean, centered feature cards inside a floating section that stands out from the page background."
          features={[
            {
              icon: "zap",
              title: "Instant builds",
              description:
                "Pages compile in milliseconds so you never wait for feedback during development.",
            },
            {
              icon: "palette",
              title: "Themeable",
              description:
                "Switch between color schemes with a single token change. Dark mode included.",
            },
            {
              icon: "lock",
              title: "Secure defaults",
              description:
                "Content Security Policy headers, sanitized output, and no inline scripts.",
            },
            {
              icon: "globe",
              title: "i18n ready",
              description:
                "Built-in support for multi-language content and locale-aware routing.",
            },
            {
              icon: "settings",
              title: "Configurable",
              description:
                "Every component exposes a clean props API so you can adapt it to your needs.",
            },
            {
              icon: "sparkles",
              title: "Polished UI",
              description:
                "Subtle animations, consistent spacing, and refined typography out of the box.",
            },
          ]}
        />
      </>
    )
  },
  "features-6": () => {
    return (
      <>
        <Features6
          title="Simple, effective, reliable"
          description="A clean text-only layout when features need to speak for themselves without icons or images."
          buttons={[
            { label: "Get started", href: "#" },
            { label: "Learn more", href: "#" },
          ]}
          features={[
            {
              title: "Fewer decisions",
              description:
                "This style trims each feature to one headline and one supporting sentence so the page stays focused.",
            },
            {
              title: "Cleaner previews",
              description:
                "Without icons or images, the section loads instantly and reads well at any viewport width.",
            },
            {
              title: "Better reuse",
              description:
                "Plain text cards work for any product vertical without custom illustration or icon sets.",
            },
            {
              title: "Consistent rhythm",
              description:
                "Border-top separators create a steady vertical cadence that anchors the reading flow.",
            },
            {
              title: "Scannable layout",
              description:
                "Three-column grid on desktop collapses to a single column on mobile without extra breakpoints.",
            },
            {
              title: "Content first",
              description:
                "No visual noise to distract from the copy. Perfect for documentation and changelog pages.",
            },
          ]}
        />
      </>
    )
  },
}

export default demos
