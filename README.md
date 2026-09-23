# KAARYA — One platform. Two journeys.

A single React application that merges the **Kaarya customer website** and the
**Gig Worker website** behind one role-based login gate.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

---

## Flow

```
/                 → redirects based on the stored session
/login            → role selection (Customer / Gig Worker)
/customer/*       → the existing Kaarya customer site
/worker/*         → the existing worker dashboard
```

The session lives in `localStorage` under `kaarya-session`:

```js
{ isLoggedIn: true, role: "customer" }   // or "worker"
```

- Reload as a customer → `/customer`; reload as a worker → `/worker`; no session → `/login`.
- Logout clears the key and returns to `/login`; customer/worker routes are unreachable afterwards.
- A customer who types `/worker/...` is redirected to `/customer`, and vice versa.
- **Switch role** (profile menu) shows a confirmation, updates the stored role and navigates across.

---

## Structure

```
src/
├── main.jsx                     app entry
├── app/
│   ├── App.jsx                  AuthProvider + BrowserRouter
│   ├── routes.jsx               top-level role routing (lazy-loads each side)
│   └── auth/
│       ├── AuthContext.jsx      session in localStorage
│       ├── ProtectedRoute.jsx   logged-out → /login
│       └── RoleGuard.jsx        wrong role → own side
│
├── pages/Login/                 RoleSelection.jsx + .css  (the gateway)
│
├── shared/
│   ├── RoleMenu.jsx/.css        profile + role menu used by both apps
│   └── RouteFade.jsx/.css       CSS cross-fade between login / customer / worker
│
├── customer/                    ← project 1, intact
│   ├── CustomerRoot.jsx         Theme/User/Language/Support providers
│   ├── CustomerApp.jsx          was App.jsx; routes now relative to /customer
│   ├── components/ pages/ context/ data/ assets/ hooks/ services/ utils/ translations/
│   └── styles/customer.css      was src/index.css (scoped, see below)
│
├── worker/                      ← project 2, intact
│   ├── WorkerRoot.jsx           Auth/Theme/Language providers
│   ├── WorkerApp.jsx            was App.jsx; routes now relative to /worker
│   ├── components/ layouts/ pages/ context/ data/ assets/ utils/ translations/
│   └── styles/worker.css        was src/index.css
│
└── styles/
    ├── tailwind.css             the single @tailwind entry point
    └── platform.css             minimal platform base
```

Both apps keep their own folder, so their relative imports, assets and CSS files
are unchanged. Nothing was deleted or rebuilt — only the router was lifted out.

---

## Integration notes

**Tailwind.** The customer project used Tailwind v4 (`@tailwindcss/vite`), the worker
project Tailwind v3 with a custom config. The merged app runs **Tailwind v3 + PostCSS**
with the worker's `tailwind.config.js` (primary / sage / cream palettes, `darkMode: 'class'`),
since the customer pages only used classic utility names. The `@tailwind` directives live
once in `src/styles/tailwind.css`.

**CSS isolation.** The customer stylesheet redefines several Tailwind-named classes
(`.bg-white`, `.rounded-lg`, `.shadow-md`, `.shadow-lg`, `.text-white`) and styles bare
`body`, `a`, `button`, `ul`, `p`, `h1–h6`. Those rules are scoped with `:where(.kaarya-app)`,
which adds **no specificity** — the customer site renders exactly as before, and the worker
UI is untouched. Page-level body styling is keyed off `role-customer`, `role-worker` and
`role-login` classes applied while each section is mounted.

**Routing.** One `BrowserRouter`. `/customer/*` and `/worker/*` mount descendant `<Routes>`,
and every internal `to=` / `navigate()` (including the worker's sidebar/bottom-nav item
arrays) was rewritten with its role prefix. Each side is `React.lazy`-loaded, so a customer
never downloads the worker bundle until they switch.

**Contexts.** Each side keeps its own providers, mounted only while that side is active,
so state and localStorage keys never collide (`karya-theme` / `fixnear-*` vs `theme` /
`language` / `user`). Theme flags (`html[data-theme]` vs `html.dark`) are cleared when
switching roles. The worker's `AuthContext` now provisions the demo worker profile directly,
since the platform login already established the role.

**Animations.** CSS transitions only — no extra animation dependency was introduced.

**Dependencies.** Union of both projects, conflicts resolved to the newer version
(`lucide-react` ^1.45, `react-router-dom` ^7.18.3). `@tailwindcss/vite` was dropped in
favour of the v3 PostCSS pipeline.

---

## Added (nothing replaced)

- `pages/Login/RoleSelection.jsx` — the gateway.
- `shared/RoleMenu.jsx` — profile/role menu, styled per side, added to both navbars.
- `customer/pages/CustomerProfile.jsx` — `/customer/profile`, written in Kaarya's existing
  design vocabulary (`glass-card`, `badge`, brand tokens).

## Tests

`scripts/smoke.mjs` and `scripts/smoke2.mjs` drive the real app in jsdom: the login gate,
session persistence, logout, both role guards, role switching in both directions, and every
customer and worker route. They need jsdom:

```
npm i -D jsdom
node scripts/smoke.mjs
node scripts/smoke2.mjs
```
