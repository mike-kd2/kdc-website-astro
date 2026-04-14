# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI consultancy website for "klauser designs & coaching" targeting Swiss SMEs. The site is in German and is hosted on Cloudflare Pages at klauserdesigns.ch.

## Tech Stack

- **Framework**: Astro 5 with TypeScript
- **UI Components**: React 19 (Islands only — interactive components)
- **Styling**: Tailwind CSS 3.4+
- **Icons**: astro-icon (Lucide set) in .astro files; lucide-react in .tsx Islands
- **Forms**: React Hook Form + Zod validation (Islands)
- **Package Manager**: pnpm
- **Hosting**: Cloudflare Pages

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server (localhost:4321)
pnpm build            # Production build
pnpm preview          # Preview production build locally
pnpm astro check      # TypeScript type checking
```

## Architecture

```
src/
├── layouts/
│   └── BaseLayout.astro    # Main layout with SEO, Header, Footer
├── components/
│   ├── layout/             # Header, Footer, Container, Section, SkipLink (.astro)
│   ├── islands/            # React Islands: ContactForm, TidyCalEmbed, FloatingCTA
│   ├── ui/                 # Static UI: Button, Card, Badge, LeistungsBlock, PaketCard, ReferenzCard (.astro)
│   │                         # React UI for Islands: Button.tsx, Input.tsx, TextArea.tsx
│   └── seo/                # StructuredData.astro
├── pages/                  # Astro pages + API endpoints
│   ├── api/contact.ts      # Contact form API (prerender = false)
│   └── *.astro             # All pages
├── styles/
│   └── globals.css         # Tailwind + CSS variables + scroll-reveal + is-scrolled
├── lib/                    # constants, analytics, email, validations, utils
├── assets/
│   └── images/             # Portrait, logos (processed by Astro Image)
└── scripts/                # (unused — scroll-reveal inlined in BaseLayout)
```

## Astro-specific Patterns

- **Static by default**: Most components are `.astro` files (no JS shipped)
- **Islands**: Interactive components use `client:load` or `client:visible` directives
- **Icons in .astro**: `import { Icon } from 'astro-icon/components'` → `<Icon name="lucide:NAME" />`
- **Icons in .tsx Islands**: `import { X } from 'lucide-react'`
- **Images**: `import { Image } from 'astro:assets'` + local asset imports
- **Props in .astro**: Destructured from `Astro.props` in frontmatter
- **Slots instead of children**: `<slot />` in .astro components
- **class not className**: Astro uses `class` attribute in templates
- **`import.meta.env`**: Use instead of `process.env` everywhere
- **Scroll reveal**: `data-reveal` attribute + IntersectionObserver in BaseLayout
- **Header scroll state**: `.is-scrolled` class toggled by vanilla JS in Header.astro

## Key Integrations

- **Calendar booking**: TidyCal at `https://tidycal.com/klauserdesigns/prozess-check`
- **Contact email**: michael@klauserdesigns.ch
- **Email sending**: Maileroo (API key via `MAILEROO_API_KEY` env var)
- **Analytics**: Matomo (self-hosted at matomo.mannfrausein.com, Site ID 2, production only)
  - `public/matomo.js` wird von Cloudflare ausgeliefert (kein externer DNS-Lookup)
  - Tracking-Requests gehen weiterhin an `matomo.mannfrausein.com/matomo.php`
  - **Wartung**: Nach Matomo-Updates `public/matomo.js` aktualisieren:
    `curl -s https://matomo.mannfrausein.com/matomo.js -o public/matomo.js`

## Environment Variables

Set in Cloudflare Pages dashboard (Settings → Environment Variables):

| Variable | Description |
|---|---|
| `MAILEROO_API_KEY` | Maileroo API key for email sending |
| `PUBLIC_SITE_URL` | Site URL (https://klauserdesigns.ch) |
| `PUBLIC_CONTACT_EMAIL` | Contact email address |

## Business Context

Website for Michael Klauser, freelance automation & data specialist:
- Automation of business processes
- Custom software tools
- Data solutions (DWH, ETL, Reporting)
- System migrations

Primary conversion goal: Prozess-Check bookings via TidyCal.

## Design System

### Colors (defined in tailwind.config.ts)
- Primary: Deep Teal (#3F4053), Light (#5A5B70)
- Accent: Amber (#F59E0B), Dark (#EA580C)
- Neutrals: Charcoal (#1F2937), Slate (#475569), Light Gray (#E2E8F0), Off-White (#F8FAFC)

### Typography
- Font: Poppins (400, 500, 600, 700) via @fontsource/poppins

## Workflow Requirements

### Visual Verification
Before reporting UI changes as complete, verify visually using the Playwright MCP server.

### Code Quality
Use `pnpm astro check` to verify TypeScript. Fix all errors before pushing.

### Git Version Control
After completing tasks:
1. Never commit secrets (.env files, API keys)
2. Create descriptive commit messages
3. Push to GitHub remote
