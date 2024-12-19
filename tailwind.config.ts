import tailwindcssScrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    'node_modules/fulldev-ui/src/**/*.astro',
  ],
  theme: {
    container: {
      screens: ['1536px'],
    },
    extend: {
      spacing: {
        gutter: 'clamp(16px, 4vw, 32px)',
        container: 'var(--container, 1536px)',
        hero: 'calc(100vh - var(--header-height, 0px) - var(--subheader-height, 0px) - var(--banner-height, 0px))',
        header: 'var(--header-height, 0px)',
        'sticky-8': 'calc(var(--header-height, 0px)  + 2rem)',
        'sticky-16': 'calc(var(--header-height, 0px)  + 4rem)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          // hover: 'hsl(var(--primary) / 85%)',
          hover: 'hsl(var(--primary) / 75%)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary) / 75%)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          hover: 'hsl(var(--muted) / 75%)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: 'hsl(var(--accent) / 75%)',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          hover: 'hsl(var(--card) / 75%)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssScrollbar({ nocompatible: true })],
} satisfies Config
