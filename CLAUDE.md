# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-file static landing page for ACE Performance Gym — a free personal training consultation lead capture page. No build system, no framework, no dependencies beyond Google Fonts loaded via CDN.

## Deployment

- **Hosting:** Vercel (auto-deploys on push to `main` branch of `StellrTest/ace-performance-gym-landing`)
- **Live URL:** `ace-performance-gym-landing.vercel.app` (custom domain `pt.acegym.club` in progress)
- **GitHub Pages** also connected at `stellrtest.github.io/ace-performance-gym-landing/` (legacy, Vercel is primary)

To deploy: `git push origin main` — Vercel picks it up automatically.

## Architecture

Everything lives in `index.html` — CSS, HTML, and JS are all inline in a single file. No separate stylesheets or script files.

**Key sections (in order):**
1. Fixed nav with logo image (`ace-logo.png`)
2. Hero with fullscreen video background (`hero.mp4`) + dark overlay
3. Trust bar
4. Benefits grid (6 glassmorphism cards)
5. Testimonials (3 cards — placeholder copy, needs real quotes)
6. Consultation steps (3 steps)
7. Booking form → posts JSON to GHL webhook on submit
8. Footer with logo and contact info

## Brand

- **Colors:** `#d71a21` (red), `#a6a6a6` (gray), `#000000` (black), `#ffffff` (white)
- **Fonts:** Bebas Neue (headings/display), Inter (body) — loaded from Google Fonts
- **Logo:** `ace-logo.png` — transparent PNG processed from AI source file; black pixels converted to white for dark backgrounds

## GHL Integration

Form submits via `fetch` POST to a GHL inbound webhook. The URL is hardcoded at the top of the `<script>` block:

```js
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/cidIARY63GFxzXEITrQl/webhook-trigger/c1dc53a9-f2f0-4018-ba4a-a981e742384f';
```

Payload fields: `firstName`, `lastName`, `email`, `phone`, `goal`, `message`, `source`, `tags`.

## Assets

- `hero.mp4` — compressed from 29MB → 4MB (720p, no audio, CRF 24) to stay under Cloudflare's 25MB asset limit
- `ace-logo.png` — 800×742px, transparent background, white text version for dark UI
- `SKILL.md` — design system reference (layout, glassmorphism, component patterns); colors and fonts from here are NOT used — only the design language/patterns
