# FLEXzcart Rebrand Design

**Goal:** Rebrand the existing Northwind storefront into `FLEXzcart` while preserving the current application structure, integrations, routes, catalog behavior, and overall layout.

**Scope:** Visual and copy-only rebrand. No product-flow redesign, no feature additions, no route changes, and no changes to the active third-party integrations beyond preserving their current behavior.

## Constraints

- Keep the current page structure, component layout, spacing model, and information architecture unchanged.
- Keep the current fonts unchanged.
- Keep Clerk, Polar, Stream, ImageKit, and Sentry integrations as-is.
- Keep the same catalog direction and product model.
- Replace green-led brand accents with a premium saturated gold palette.
- Use the provided crown logo as the core brand mark.

## Brand Direction

### Brand Name

- Primary brand name: `FLEXzcart`
- Replace visible uses of `Northwind` and `Northwind Supply` with `FLEXzcart`

### Visual Tone

- Luxury retail brand
- Black and deep charcoal base
- Saturated vibrant premium gold in place of the current green primary system
- Same structural composition and typography, but updated brand identity

### What Must Not Change

- Route map
- Component hierarchy
- Product, cart, order, admin, checkout, chat, and video workflows
- API contracts
- Catalog categories and overall merchandise direction

## Asset Strategy

### Logo

- Source image: `C:/Users/opcha/Downloads/logo-s.jpg.jpeg`
- Use the crown logo in the navbar brand area
- Use the crown logo in the footer brand area where appropriate
- Derive a favicon/app icon treatment from the same logo if feasible within current asset structure

### Color System

The current green accent tokens and classes should be translated into a gold-led brand treatment without changing the component structure.

Target color behavior:

- Primary accent: rich metallic gold
- Secondary accent: deeper amber-gold
- Supporting backgrounds: black, near-black, deep charcoal
- Borders and subtle surfaces: muted warm neutral/dark tones that still work with DaisyUI and existing Tailwind utility usage

The implementation should favor:

- Gold for primary CTAs, badges, highlights, icons, and interactive emphasis
- Dark backgrounds preserved or deepened where needed to support the gold accent
- No structural redesign, only token/theme-level restyling and direct class updates where necessary

## Content and Copy Changes

### Visible Brand Copy

Update brand-specific copy in the existing UI to `FLEXzcart`, including:

- Navbar brand text
- Footer brand text
- HTML document title
- Brand references in hero/support/store messaging where they currently name the old brand

### Copy Style

- Keep the same content purpose and page intent
- Preserve the same catalog direction
- Shift phrasing only where needed to remove the old brand name or better fit the premium brand identity

Examples of acceptable change:

- “Northwind Supply” -> “FLEXzcart”
- “Northwind” watermark -> “FLEXzcart”
- Generic support/store copy can be made slightly more premium in tone if the structure remains unchanged

## Code and File Surface

### Frontend Surfaces Expected to Change

- `frontend/index.html`
  - title
  - favicon reference if updated
- `frontend/public/*`
  - add/update logo-derived brand asset(s) as needed
- `frontend/src/components/Navbar.jsx`
  - brand mark
  - brand name
  - color accents if needed
- `frontend/src/components/Footer.jsx`
  - brand name and any brand-forward copy
- `frontend/src/components/HomeHero.jsx`
  - only copy/color adjustments, no structural change
- `frontend/src/index.css`
  - global theme variables or supporting style rules for gold treatment
- `frontend/src/lib/imagekitUrl.js`
  - replace watermark text from `Northwind` to `FLEXzcart`
- `frontend/src/store/cart.js`
  - replace persisted storage key only if the old brand-specific key is considered user-facing technical debt; otherwise leave unchanged to avoid cart migration side effects
- `frontend/src/pages/SentryDemoPage.jsx`
  - replace demo-only old brand strings that appear in logs/messages shown in UI

### Backend Surfaces Expected to Change

- No behavioral backend rebrand required
- Only change backend brand strings if they are surfaced directly to users or leak the old brand meaningfully

Candidate files:

- `backend/src/controllers/orderController.ts`
- `backend/src/lib/stream.ts`

These should only be changed if the support-channel naming materially exposes the old brand or conflicts with the new brand voice.

## Risk and Compatibility Notes

### Logo Integration Risk

The provided logo is a raster image with a black background. It may need one of these treatments:

- direct use on dark surfaces if it blends cleanly
- contained image badge/tile in navbar/footer
- derived transparent or simplified asset if direct placement looks visually heavy

The safest initial implementation is to preserve layout and place the raster logo in a bounded brand container rather than redesign the header.

### Color Migration Risk

Because the project uses existing utility classes and DaisyUI styling, not every green accent may be centrally tokenized. Some color changes may require targeted class replacement in brand-facing components while still preserving layout and structure.

### Storage Key Risk

Changing the persisted cart storage key would reset existing local carts. Since this is a rebrand rather than a new product model, the preferred default is to leave the storage key unchanged unless a clean brand reset is explicitly desired.

## Verification Expectations

The implementation is complete when:

- The app still builds successfully in frontend and backend
- The storefront still behaves the same as before
- The visible brand is consistently `FLEXzcart`
- The crown logo is integrated into the current layout without structural redesign
- Green brand accents are replaced by a premium gold treatment
- No core runtime integration behavior is broken

## Out of Scope

- Redesigning the page structure
- Rewriting the catalog model
- Changing fonts
- Swapping vendors or auth/payment/chat/image/monitoring providers
- Adding new features
- Re-architecting the theme system beyond what is needed for the rebrand
