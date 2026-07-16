# Project details page

Figma: project-page frame (node 2137-5516). Build to match, reusing home modifications.

## Decisions (from Odunsi)
- Title: 28px, same weight as home (PP Editorial Ultralight / font-display)
- Media boxes: fixed 550px tall, left as empty placeholders (media coming later)
- Routes: per-project, slug-based (/project/novamed)
- Prev/Next: 50% opacity = disabled state when there's no prev/next project
- Back button: goes to home, outdented left (outside the content grid)
- Link button: "COMING SOON" (muted) when no link; "LIVE SITE" (primary) + clickable when a link exists

## Build steps
- [ ] content.ts — add `projects` data + `slug` on NovaMed card
- [ ] lib/layout.ts — shared INSET constant
- [ ] components/Header.tsx — extract shared header (status + sound mute toggle)
- [ ] Home.tsx — use shared Header; link NovaMed card to /project/novamed
- [ ] ProjectDetail.tsx — rewrite to match Figma (back btn, intro row, description, hero + gallery, nav footer)
- [ ] App.tsx — route /project/:slug
- [ ] Verify in browser
