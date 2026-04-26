# Filtering — Task List

## ✅ Done

- [x] Add `"use client"` + `useState` to `ProductGrid`
- [x] Wire `onClick` on each filter tab
- [x] Filter products by `categoryId` (Intérieur / Extérieur / Fruitiers / Aromatiques)
- [x] Add "Tous" tab (shows all 100 plants)
- [x] Counter badge per tab (e.g. Intérieur **25**)
- [x] Limit default display to 12 cards + "Voir les X autres" button
- [x] Reset visible count when switching category
- [x] Add `categoryId` field to `Product` type (database-ready foreign key)
- [x] Populate 100 plants in `catalog.ts` (25 per category)
- [x] Fix CSP (`script-src 'unsafe-eval'` in dev) so React hydration works

---

## 🔲 To Do — Data layer (real database)

- [ ] Choose data source: Supabase / PlanetScale / MongoDB / JSON API
- [ ] Create `products` table/collection with schema matching `Product` type
- [ ] Create `categories` table/collection
- [ ] Seed DB with the 100 plants from `catalog.ts`
- [ ] Write `getProductCatalog()` to fetch from DB (replace static array)
- [ ] Write `getProductsByCategory(categoryId)` to query DB
- [ ] Add loading skeleton while products fetch
- [ ] Handle fetch errors gracefully (error boundary or fallback UI)

## 🔲 To Do — Filtering UX improvements

- [ ] Server-side filtering via URL search params (`?category=interieur`)
  - Enables shareable filtered URLs
  - Keeps filter state on page refresh
- [ ] Add sort options: price asc/desc, name A→Z
- [ ] Add text search input inside the section
- [ ] Add price range slider filter
- [ ] Animate card grid on filter change (Framer Motion `AnimatePresence`)

## 🔲 To Do — Product images

- [ ] Add real photos to `public/products/` (one `.jpg` per `id`)
- [ ] Switch `<img>` to Next.js `<Image>` with `width`/`height` for optimization
- [ ] Add `remotePatterns` in `next.config.ts` if images are hosted externally

## 🔲 To Do — Product detail

- [ ] Create `/plantes/[id]` dynamic route for product detail page
- [ ] Link each card to its detail page
- [ ] Show full description, care instructions, price, and "Commander" CTA

---

## File map

| File | Role |
|------|------|
| `types/product.ts` | `Product` and `Category` types |
| `features/products/infrastructure/catalog.ts` | Static data (replace with DB calls) |
| `features/products/application/get-product-catalog.ts` | Use-case functions |
| `features/products/presentation/product-grid.tsx` | UI — filter tabs + card grid |
