# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Create an e-commerce landing page with product cards

## Goal
Build a bold, dark-themed e-commerce landing page with a product card grid, category filters, featured section, and newsletter signup.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #1a1a2e`, `--foreground: #f5f5f5`, `--card: #22223d`, `--border: #2e2e50`, `--muted-foreground: #a0a0c0`, `--primary: #e94560`, `--accent: #ff7096`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)
- ProductCard (components/ProductCard.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`nav`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
