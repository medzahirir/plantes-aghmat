# Aghmat Plants

Marketing landing page for a Morocco-based plant business built with Next.js App Router, Tailwind CSS, Zustand, and Zod.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` from `.env.example`.

```bash
cp .env.example .env.local
```

Required values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BUSINESS_NAME`
- `NEXT_PUBLIC_BUSINESS_PHONE`
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`
- `CONTACT_RECIPIENT_EMAIL`

## Quality checks

```bash
npm run check
```

## Vercel deployment

1. Import the repository into Vercel.
2. Set the framework preset to `Next.js` if Vercel does not detect it automatically.
3. Add the variables from `.env.example` in the Vercel project settings.
4. Deploy with the default build command `npm run build`.

This project already includes:

- production security headers in `next.config.ts`
- production-friendly compression and `poweredByHeader` disabled
- `next/image` usage for catalog media
- lazy loading for client-only cart and contact form bundles
- env-backed site configuration in `lib/config/site.ts`
