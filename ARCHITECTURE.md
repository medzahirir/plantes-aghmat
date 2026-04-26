# Project Structure

This project uses the Next.js App Router for routing in `app/` and keeps business logic outside the route tree.

## Folder responsibilities

- `app/`: routes, layouts, route handlers, and route-level composition.
- `components/`: shared UI reused across multiple features.
- `features/`: vertical slices for domain-specific business logic.
- `lib/`: framework-agnostic helpers, config, constants, and validations.
- `hooks/`: reusable React hooks shared across features.
- `types/`: shared TypeScript contracts used across the app.
- `services/`: cross-feature API clients and HTTP abstractions.

## Clean architecture flow

Keep dependencies moving inward:

1. `presentation`
2. `application`
3. `domain`

`infrastructure` adapts external systems to the domain and application layers.

## Feature slice convention

Each feature should follow this shape:

- `domain/`: entities, value objects, and business rules.
- `application/`: use cases and orchestration.
- `infrastructure/`: API calls, repositories, DTO mappers.
- `presentation/`: feature UI, view models, and feature-local hooks.

## Practical rule of thumb

- Put route files in `app/`.
- Put reusable page sections in `components/`.
- Put feature-specific logic and UI in `features/<feature-name>/`.
- Put generic helpers in `lib/`.
- Put shared external clients in `services/`.
