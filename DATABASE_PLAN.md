# Database Implementation Plan: Prisma & Supabase

## Overview
Integration of **Prisma ORM** with **Supabase (PostgreSQL)** to provide a robust, type-safe data layer for Plantes Aghmat.

## 1. Setup Phase
- [ ] Initialize Prisma in the project: `npx prisma init`
- [ ] Configure `.env` with Supabase Connection String (Transaction mode for pooling).
- [ ] Install Prisma Client: `npm install @prisma/client`

## 2. Core Schema Entities
The schema will support products, orders, and logistics:

```prisma
// schema.prisma snippet
enum Role {
  USER
  EDITOR
  MANAGER
  ADMIN
  SUPERUSER
  PROVIDER
  SHIPPER
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(USER)
  orders        Order[]
  profile       Profile?
  createdAt     DateTime  @default(now())
}

model Product {
  id            String    @id @default(cuid())
  name_fr       String
  name_ar       String
  description_fr String
  description_ar String
  price         Float
  stock         Int
  images        Image[]
  category      Category  @relation(fields: [categoryId], references: [id])
  categoryId    String
}

model Order {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  status        String    // PENDING, SHIPPED, DELIVERED
  items         OrderItem[]
  shipperId     String?
  shipper       User?     @relation("ShipperRelation", fields: [shipperId], references: [id])
}
```

## 3. Supabase Integration Features
- **Real-time**: Enable for order tracking.
- **Storage**: Use Supabase Buckets for high-quality botanical images.
- **Edge Functions**: For automated notifications (email/SMS) to shippers.

## 4. Migration Workflow
1. Define schema in `prisma/schema.prisma`.
2. Generate migration: `npx prisma migrate dev --name init`.
3. Push to Supabase: Prisma will handle the SQL generation.
