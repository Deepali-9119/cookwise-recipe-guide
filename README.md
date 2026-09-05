# CookWise Assistant

Build a clean, premium-quality frontend for "CookWise" — an AI-powered recipe generator for beginner cooks. This is a frontend-only build. There is NO AI logic inside this app. All recipe generation happens on an external backend (n8n workflow + LLM). This app's only job is to collect input, send it to a webhook, receive structured JSON back, and render it beautifully.

Use the name "CookWise" consistently everywhere — logo, page title, headings.

=== BRAND & VISUAL IDENTITY ===

Tone: warm, modern, trustworthy — like a premium food/lifestyle brand, not a generic SaaS tool.

Color palette:

- Primary: warm terracotta/burnt orange (#D97A4A) — CTAs, active states, accents

- Secondary: deep forest green (#2F4B3C) — headers, icons

- Background: warm off-white (#FAF7F2), not stark white

- Text: charcoal (#2B2B2B) primary, warm gray (#6B6B63) secondary

- Card backgrounds: white with subtle warm-tinted shadows

Typography:

- Headings: a warm serif (e.g., "Fraunces" or "Lora")

- Body/UI text: clean sans-serif (e.g., "Inter" or "Manrope")

- Font sizes: H1 40-48px, H2 28-32px, H3 20-22px, body 16px

- Line height: 1.5-1.6 for body text

Icons: rounded, line-style icon set (Lucide or Phosphor). Icon size 20-24px in UI, 32-40px in highlights.

Shape language:

- Border radius: 16px cards, 12px buttons/inputs, pill-shaped badges

- Shadows: soft, warm-tinted, low-opacity — never harsh or heavy

- Cards: white background, 1px hairline border in warm gray, 24-32px internal padding

Spacing: generous whitespace throughout. Section spacing 80-120px desktop, 48-64px mobile. Consistent 8px spacing scale.

Layout: desktop-first, fully responsive to mobile. Max content width ~1200px, centered.

Accessibility: WCAG AA contrast, visible focus states, clear form labels (not placeholder-only).

=== NAVIGATION ===

Simple top nav bar, sticky on scroll:

- Left: CookWise logo/wordmark

- Right: CTA button "Generate a Recipe"

- No breadcrumbs, no hamburger menu needed — this is a single-flow app (input → output), keep it minimal. On mobile, just keep the logo and CTA button, no menu needed since there's nothing to navigate to.

=== HERO SECTION ===

Headline: "Never guess your way through a recipe again."

Supporting copy: "CookWise is your AI cooking assistant, built for beginners. Tell us what you want to cook and get a clear, step-by-step recipe you can actually follow."

Primary CTA button: "Start Cooking" — terracotta, scrolls smoothly to the input form.

A simple, tasteful illustration or abstract graphic (steam swirls, plate outline) beside or behind the headline — no literal stock food photography.

Hero height roughly 60-70% of viewport on desktop, more compact on mobile.

=== INPUT FORM SECTION ===

Card-based form, centered, max-width ~600px, elevated with soft shadow on the warm background.

Fields (keep this short and focused):

1. Dish name OR ingredients — single large text input, primary field, helper text: "Enter a dish name, or list ingredients you have"

2. Servings — stepper control (- 2 +)

3. Cooking time available — segmented control or chip selector: Under 15 min / 15–30 min / 30–60 min / 60+ min

Primary CTA button below the form: "Generate My Recipe" — full width, terracotta, subtle hover lift animation.

Keep the form to exactly these three fields. Consistent spacing (24px) between fields, small uppercase labels above each (muted color, 12-13px).

=== LOADING STATE ===

While waiting for the webhook response, replace the form area with a centered loading experience:

- A subtle looping animation (e.g., a softly pulsing icon or steam-swirl)

- One rotating short message every 2-3 seconds, e.g., "Getting your measurements exact...", "Plating it up..."

- Keep it calm and simple — no jarring spinners.

=== RECIPE OUTPUT SECTION ===

Header block:

- Recipe title (large serif heading)

- Row of 2-3 pill badges below the title: total time, servings — each with a small icon (clock, people icon)

Two-column layout on desktop (stacks on mobile):

- Left column (~35% width): "Ingredients" — checklist-style list with checkboxes, quantity + unit clearly aligned

- Right column (~65% width): "Instructions" — numbered step cards, each showing step number, instruction text, and a small time badge (e.g., "4 min") in the corner. Generous spacing, subtle left accent border in the primary color.

Below the two-column layout, include ONE simple accordion section: "Tips" — collapsed by default, expands to show beginner tips if the backend provides them. If the backend doesn't send this field, hide the accordion entirely — do not show an empty section.

At the bottom: a "Generate another recipe" button that scrolls back up and resets the form.

=== HANDLING MISSING BACKEND FIELDS ===

The frontend must never display an empty or placeholder-filled section. If the "tips" field is missing or null in the backend response, hide that accordion completely.

=== MOBILE UX ===

- All tappable elements (buttons, checkboxes, accordion header) must have generous touch targets (minimum ~44x44px)

- Comfortable spacing to prevent mis-taps

- Cards stack cleanly, no horizontal scrolling

- All interactions must work with a single tap, no hover-dependent behavior

=== ERROR STATE ===

If the webhook call fails or times out, show a simple, calm message (e.g., "Something went wrong — let's try that again.") with a clear "Retry" button. No technical jargon or raw error codes visible to the user.

=== BACKEND INTEGRATION ===

This frontend does NOT generate recipes itself. On form submission:

- Collect all form fields into a single structured JSON payload

-  I want to connect this site to it's backend logic in n8n through this webhook: https://deepali1automates.app.n8n.cloud/webhook/a3819878-9a6a-4f91-b66e-d2a4500f9ff0

- Show the loading state while awaiting the response

- The webhook will return structured JSON matching this shape:

  {

    "dishName": string,

    "servings": number,

    "totalTimeMinutes": number,

    "ingredients": [{ "item": string, "quantity": number, "unit": string }],

    "steps": [{ "stepNumber": number, "instruction": string, "timeMinutes": number }],

    "tips": [string] (optional)

  }

- Populate the entire output section dynamically from this response — never hardcode any recipe content

- Handle errors using the simple error state described above

=== PRODUCT QUALITY ===

This build is for a Product Management internship assignment. Prioritize clarity and usability over decoration. The interface should feel simple, trustworthy, and easy to use for a first-time cook — not cluttered with unnecessary features. Every element on the page should have a clear purpose.

=== AVOID ===

Do not use:

- Glassmorphism, neon colors, excessive gradients

- Cartoon-style UI or illustrations

- Cluttered layouts or multiple competing CTAs

- Heavy or distracting animations

- Generic AI-chatbot-style layouts (no chat bubbles, no "typing..." indicators)

- Lorem Ipsum or placeholder filler text

- Fake or hardcoded recipe content

Build this as a complete, clean, responsive web app. Keep the scope tight — do not add extra sections, pages, or features beyond what's described above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cookwise-recipe-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/741642a3-367e-4377-8efe-54bc6b2740fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
