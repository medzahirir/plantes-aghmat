# Internationalization Plan (i18n): Arabic & French

## Overview
Implementation of multi-language support for **Plantes Aghmat** using `next-intl` (recommended for Next.js App Router).

## 1. Tech Stack
- **Library**: `next-intl`
- **Languages**: 
  - `fr`: French (Default - LTR)
  - `ar`: Arabic (RTL Support)

## 2. Directory Structure
```text
messages/
  fr.json
  ar.json
app/
  [locale]/
    layout.tsx
    page.tsx
    boutique/
      page.tsx
middleware.ts (Handling locale detection)
```

## 3. RTL (Right-to-Left) Implementation
- Use the `dir` attribute on the `<html>` tag based on the locale.
- CSS: Utilize logical properties (e.g., `ms-auto` instead of `ml-auto`) to ensure layout flips automatically for Arabic.
- Font: Use `Plus Jakarta Sans` for FR and `Amiri` or `IBM Plex Sans Arabic` for AR.

## 4. Content Strategy
- **Static Text**: Managed via JSON files in `/messages`.
- **Dynamic Content**: Database fields `name_fr`, `name_ar` etc. (as defined in DATABASE_PLAN.md).

## 5. Middleware Logic
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr'
});
```
