# FLEXzcart Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the existing storefront to `FLEXzcart` with the supplied crown logo and a premium gold palette while preserving the current layout, flows, integrations, and catalog structure.

**Architecture:** The implementation stays intentionally narrow. It updates frontend brand assets, visible brand copy, and theme styling in place, plus a small set of backend/user-facing stream naming strings where the old brand still leaks into customer-visible labels. No route, data, API, or feature behavior changes are introduced.

**Tech Stack:** React 19, Vite, Tailwind CSS 4, DaisyUI, Zustand, Express, TypeScript

---

### Task 1: Add FLEXzcart Brand Assets

**Files:**
- Create: `frontend/public/flexzcart-crown.jpg`
- Modify: `frontend/index.html`
- Test: `frontend/public/flexzcart-crown.jpg` loads from Vite static assets

- [ ] **Step 1: Copy the supplied logo into the frontend public asset directory**

Run:

```powershell
Copy-Item 'C:\Users\opcha\Downloads\logo-s.jpg.jpeg' 'C:\Users\opcha\Downloads\northwind-store-master\northwind-store-master\frontend\public\flexzcart-crown.jpg'
```

Expected: the new file exists at `frontend/public/flexzcart-crown.jpg`

- [ ] **Step 2: Update the HTML shell title and favicon reference**

Set `frontend/index.html` to use:

```html
<!doctype html>
<html lang="en" data-theme="forest">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/flexzcart-crown.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FLEXzcart</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify the asset reference is valid**

Run:

```powershell
Get-Item 'C:\Users\opcha\Downloads\northwind-store-master\northwind-store-master\frontend\public\flexzcart-crown.jpg'
```

Expected: the file metadata prints successfully

### Task 2: Replace the Theme With a Gold-Led Brand Palette

**Files:**
- Modify: `frontend/src/index.css`
- Test: `frontend/src/index.css`

- [ ] **Step 1: Write the failing visual requirement down**

Requirement: existing green-led DaisyUI theme must be replaced with a dark premium gold palette without changing layout or typography.

- [ ] **Step 2: Implement the theme override**

Update `frontend/src/index.css` so DaisyUI keeps the existing app structure but uses a custom gold-forward theme:

```css
@import "tailwindcss";

@plugin "daisyui" {
  themes:
    luxury --default {
      "color-scheme": "dark";
      --color-base-100: oklch(14% 0.01 85);
      --color-base-200: oklch(18% 0.015 85);
      --color-base-300: oklch(24% 0.02 85);
      --color-base-content: oklch(94% 0.02 90);
      --color-primary: oklch(78% 0.16 85);
      --color-primary-content: oklch(16% 0.02 85);
      --color-secondary: oklch(68% 0.15 72);
      --color-secondary-content: oklch(14% 0.02 85);
      --color-accent: oklch(72% 0.18 95);
      --color-accent-content: oklch(14% 0.02 85);
      --color-neutral: oklch(19% 0.01 85);
      --color-neutral-content: oklch(92% 0.02 90);
      --color-info: oklch(71% 0.11 238);
      --color-success: oklch(74% 0.14 150);
      --color-warning: oklch(82% 0.17 84);
      --color-error: oklch(66% 0.2 28);
      --radius-box: 1rem;
      --radius-btn: 0.85rem;
      --border: 1px;
      --depth: 1;
      --noise: 0;
    };
}

@layer base {
  body {
    background:
      radial-gradient(circle at top, rgba(245, 183, 43, 0.12), transparent 26%),
      linear-gradient(180deg, rgba(15, 15, 15, 1) 0%, rgba(23, 23, 23, 1) 100%);
  }
}
```

- [ ] **Step 3: Verify the CSS parses in the production build**

Run:

```powershell
npm run build
```

Workdir: `frontend`

Expected: Vite production build completes successfully

### Task 3: Rebrand Shared Frontend Brand Surfaces

**Files:**
- Modify: `frontend/src/components/Navbar.jsx`
- Modify: `frontend/src/components/Footer.jsx`
- Modify: `frontend/src/components/HomeHero.jsx`
- Test: `frontend/src/components/Navbar.jsx`, `frontend/src/components/Footer.jsx`, `frontend/src/components/HomeHero.jsx`

- [ ] **Step 1: Update the navbar brand lockup**

Use the existing structure, but swap the icon wrapper for the supplied logo image and rename the brand to `FLEXzcart`.

Target JSX inside `Navbar.jsx`:

```jsx
<Link
  to="/"
  className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold tracking-wide md:text-xl"
>
  <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg border border-primary/30 bg-neutral/80 shadow-[0_0_18px_rgba(245,183,43,0.18)]">
    <img src="/flexzcart-crown.jpg" alt="FLEXzcart crown logo" className="h-full w-full object-cover" />
  </span>
  <span className="leading-none">FLEXzcart</span>
</Link>
```

- [ ] **Step 2: Update the footer brand and copy**

Replace `Northwind Supply` with `FLEXzcart`, keep the same structure, and keep the same support meaning with more premium wording.

- [ ] **Step 3: Update the hero copy without changing layout**

Keep the current hero structure and buttons, but revise the text toward premium-curated retail messaging.

Use:

```jsx
<h1 className="text-3xl font-bold tracking-tight text-base-content md:text-4xl lg:text-5xl">
  Curated electronics &amp; workspace pieces, <span className="text-primary">elevated for daily use</span>
</h1>
```

and:

```jsx
<p className="mt-4 max-w-lg text-base leading-relaxed text-base-content/70">
  Premium audio, wearables, workspace, and travel essentials from FLEXzcart. Secure checkout;
  after payment, use your order page for support chat and video.
</p>
```

- [ ] **Step 4: Verify the updated components compile**

Run:

```powershell
npm run build
```

Workdir: `frontend`

Expected: build passes with the new brand UI

### Task 4: Rebrand Utility Strings and Watermarks

**Files:**
- Modify: `frontend/src/lib/imagekitUrl.js`
- Modify: `frontend/src/pages/SentryDemoPage.jsx`
- Test: `frontend/src/lib/imagekitUrl.js`, `frontend/src/pages/SentryDemoPage.jsx`

- [ ] **Step 1: Replace the ImageKit watermark brand**

Change the watermark helper from `Northwind` to `FLEXzcart` in `frontend/src/lib/imagekitUrl.js`.

Expected code:

```js
return `l-text,i-FLEXzcart,fs-${fs},co-FFFFFF,bg-0F172A90,pa-8_12,lx-N14,ly-14,lap-top_right,l-end`;
```

- [ ] **Step 2: Replace old brand strings in the Sentry demo page**

Change demo tenant and message strings from `northwind` to `flexzcart` in `frontend/src/pages/SentryDemoPage.jsx`.

- [ ] **Step 3: Leave the cart persistence key unchanged**

Do not change `northwind-cart` in `frontend/src/store/cart.js` to avoid resetting existing carts during a pure rebrand.

- [ ] **Step 4: Verify the string changes compile**

Run:

```powershell
npm run build
```

Workdir: `frontend`

Expected: build passes

### Task 5: Rebrand Customer-Visible Stream Labels

**Files:**
- Modify: `backend/src/lib/stream.ts`
- Modify: `backend/src/controllers/orderController.ts`
- Test: `backend/src/lib/stream.ts`, `backend/src/controllers/orderController.ts`

- [ ] **Step 1: Update staff display prefixes**

In `backend/src/lib/stream.ts`, replace the mojibake separator strings with stable ASCII and rename support labels to match the brand tone:

```ts
if (role === "admin") return `Admin | ${base}`;
if (role === "support") return `FLEXzcart Support | ${base}`;
```

- [ ] **Step 2: Update channel names and invite copy**

In `backend/src/controllers/orderController.ts`, update:

```ts
name: `FLEXzcart Support | order ${order.id.slice(0, 8)}`
```

and:

```ts
text: `FLEXzcart video call: use Join below to enter the support session. ${joinUrl}`,
```

- [ ] **Step 3: Verify backend compilation**

Run:

```powershell
npm run build
```

Workdir: `backend`

Expected: TypeScript compilation succeeds

### Task 6: Full Verification

**Files:**
- Modify: none
- Test: `frontend`, `backend`

- [ ] **Step 1: Run frontend build**

Run:

```powershell
npm run build
```

Workdir: `frontend`

Expected: PASS

- [ ] **Step 2: Run backend build**

Run:

```powershell
npm run build
```

Workdir: `backend`

Expected: PASS

- [ ] **Step 3: Review for leftover old-brand strings**

Run:

```powershell
Get-ChildItem -Recurse -File | Select-String -Pattern 'Northwind|northwind' | ForEach-Object { "{0}:{1}:{2}" -f $_.Path, $_.LineNumber, $_.Line.Trim() }
```

Expected: only intentional leftovers remain, such as docs or the preserved cart storage key
