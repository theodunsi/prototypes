# CLAUDE.md

## Who I Am
Product designer learning to code (JavaScript). I use Claude Code primarily for **design-to-prototype workflows** — turning screenshots and design mockups into functional, interactive prototypes. I'm not a senior engineer; I'm a vibe coder who thinks in visuals, not abstractions. Meet me where I am.

## Brand Tokens (Neutral Theme)
- Background: `#FAFAFA` (light) / `#171717` (dark)
- Surface: `#FFFFFF` (light) / `#262626` (dark)
- Text Primary: `#171717` (light) / `#F5F5F5` (dark)
- Text Secondary: `#737373`
- Border: `#E5E5E5` (light) / `#404040` (dark)
- Accent: `#525252`
- Always apply this neutral palette unless I specify otherwise.
- When prototyping from a screenshot, infer typography, spacing, and layout from the image — but default to these neutral tones.

---

## Workflow Orchestration

### 1. Plan First, Always
- Enter plan mode for any task with more than 2 steps or any layout/component decisions.
- **Show me the plan in plain language**, not developer jargon. Bullet points, not paragraphs.
- If something breaks mid-build, stop and re-plan. Don't stack fixes on top of broken code.
- When I give you a screenshot, your plan should start with: what you see → what you'll build → what tech/framework you'll use → what assumptions you're making.

### 2. Subagent Strategy
- Use subagents to keep the main conversation clean — especially for debugging, researching a library, or exploring multiple layout approaches.
- If I ask "should I use X or Y?", spin up a subagent to compare rather than guessing.
- One task per subagent. Don't overload.

### 3. Learn From My Corrections
- After any correction from me, update `tasks/lessons.md` with the pattern.
- Write the lesson in plain English — e.g., "Odunsi prefers padding over margin for card spacing" not "refactored box model approach."
- Review lessons at the start of each session if relevant.
- Over time, you should need fewer corrections from me.

### 4. Verify Before Calling It Done
- Never say "done" without a working preview or confirmation it runs.
- If it's a UI prototype, visually verify it matches the intent of the screenshot/mockup.
- Ask yourself: "Does this look like something a designer would ship, or does it look like a developer's placeholder?"
- Run the code. Check for console errors. Don't hand me broken output.

### 5. Make It Look Good
- I care about visual fidelity. Pixel-perfect matters more to me than code elegance.
- Default to clean, modern UI patterns. No ugly defaults.
- If a component looks off, fix the styling before moving on — don't leave it for later.
- But don't over-engineer the code. Simple and working > clever and fragile.

### 6. Fix Bugs Without Hand-Holding
- When something breaks, investigate and fix it. Don't ask me to read error logs.
- If a dependency is missing, install it. If a path is wrong, correct it.
- Only come back to me when you need a **design decision**, not a technical one.

---

## Task Management

1. **Plan First**: Write the plan to `tasks/todo.md` with checkable items.
2. **Confirm Plan With Me**: Don't start building until I approve the approach.
3. **Track Progress**: Mark items complete as you go.
4. **Show, Don't Tell**: When a step is done, show me what it looks like — a preview, screenshot, or running output.
5. **Document Results**: Add a review section to `tasks/todo.md`.
6. **Capture Lessons**: Update `tasks/lessons.md` after any correction.

---

## How I Work (Read This Carefully)

- **I think in visuals.** I'll often give you a screenshot and say "build this." That's the spec.
- **I don't know all the right terms.** If I say something vague like "make it pop" or "it feels off," work with me — suggest concrete changes rather than asking me to be more specific.
- **I'm learning JavaScript.** When you write JS, add brief comments explaining non-obvious logic. Don't over-comment, but help me learn as we go.
- **I prefer single-file outputs** when possible (HTML + CSS + JS in one file) for quick prototyping.
- **I use Tailwind** for most prototyping. Default to Tailwind unless I say otherwise.
- **4K quality** for any generated images or visual assets.
- **Don't patronize me.** I'm a designer, not a beginner at thinking. I just happen to be early in my coding journey.

---

## Core Principles

- **Visual fidelity first.** The prototype should look like the design, not "close enough."
- **Simplicity in code.** I don't need clever abstractions. I need code I can read and learn from.
- **Minimal changes.** When editing, touch only what's necessary. Don't refactor things I didn't ask about.
- **No placeholders.** Don't use lorem ipsum or gray boxes unless I specifically say to. Use realistic content.
- **Explain trade-offs in my language.** "This approach is faster to build but harder to animate later" > "This has tighter coupling."
