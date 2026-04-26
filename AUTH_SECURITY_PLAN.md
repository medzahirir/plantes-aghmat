# Authentication & Authorization (RBAC) Plan

## Overview
High-security implementation using **Auth.js (NextAuth)** or **Supabase Auth** with a strict **Role-Based Access Control (RBAC)** system.

## 1. User Roles & Permissions
| Role | Access Level | Description |
| :--- | :--- | :--- |
| **User** | Level 1 | Customer access (orders, profile). |
| **Shipper** | Level 2 | Access to delivery addresses and order status updates. |
| **Provider** | Level 2 | Stock management for their specific products. |
| **Editor** | Level 3 | Content management (blog, product descriptions). |
| **Manager** | Level 4 | Inventory oversight, reporting, sales analytics. |
| **Admin** | Level 5 | System settings, user management. |
| **SuperUser** | Level 6 | Root access to database and system architecture. |

## 2. Authentication Flow
- **Supabase Auth**: Social logins (Google, Apple) + Magic Links.
- **Session Management**: JWT or Database sessions via Prisma Adapter.

## 3. High-Level Security Measures
- **RBAC Middleware**: Server-side checks on every route.
- **RLS (Row Level Security)**: Configured in Supabase/PostgreSQL to ensure users can only see their own data.
- **API Rate Limiting**: Prevent brute-force attacks on auth endpoints.
- **Input Validation**: `Zod` schemas for all server actions and API routes.
- **Audit Logs**: Record all management actions (created in a separate `AuditLog` table).

## 4. Implementation Example (RBAC Middleware)
```typescript
export function middleware(req) {
  const role = req.nextauth.token.role;
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && role !== 'ADMIN' && role !== 'SUPERUSER') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
}
```
