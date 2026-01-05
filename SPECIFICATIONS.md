# Project Specifications

## Architecture Overview

- Monorepo TypeScript
- Backend: NestJS + MariaDB + Redis
- Frontend Web: Next.js
- Frontend Mobile: React Native
- ORM: Prisma
- API Layer: GraphQL + GraphQL Code Generator

## Project Structure

```
/
├── apps/
│   ├── api/                # NestJS API
│   ├── web/                # Next.js frontend
│   └── mobile/             # React Native app
├── packages/
│   ├── api/                # Api types (not used)
│   ├── eslint-config/      # Es lint config
│   ├── jest-config/        # Jest configs
│   ├── ui/                 # Ui components (shadcn)
│   └── typescript-config/  # Typescript config
```

## Tech Stack Details

### Backend (NestJS)

- Framework: NestJS
- Database: MariaDB with Prisma ORM
- Cache: Redis
- GraphQL: Apollo Server
- Authentication: JWT/Session based

### Frontend Web (Next.js)

- Framework: Next.js (App Router)
- UI: Shadcn and tailwindcss
- GraphQL Client: React-query Client
- Code Generation: GraphQL Code Generator

### Frontend Mobile (React Native)

- Framework: React Native & Expo
- UI: Shadcn and nativewind
- Navigation: React Navigation
- GraphQL Client: React-query Client
- Code Generation: GraphQL Code Generator

### Deployment

- Docker and Docker compose
- Nginx for the frontend

## Development Conventions

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Import order: external → internal → relative

### Naming Conventions

- Components: PascalCase
- Files: kebab-case
- GraphQL types: PascalCase
- Database tables: snake_case

### GraphQL Schema Patterns

- Queries: get*, list*, find\*
- Mutations: create*, update*, delete\*
- Input types suffix: Input
- Return types suffix: Response (if wrapper needed)

### Prisma Schema Conventions

- Model names: PascalCase
- Field names: camelCase
- Relations: explicit with @relation

## Common Tasks

### Adding a new feature

1. Define GraphQL schema in `apps/api/prisma/schema.graphql`
2. Run codegen: `bun run codegen`
3. Create Prisma model if needed
4. Implement resolver in backend
5. Create React components using generated types

### Database Changes

1. Update `prisma/schema.prisma`
2. Run `bunx prisma migrate dev --name description`
3. Run `bunx prisma generate`
4. Update GraphQL schema if needed

### Testing

- Unit tests: Jest
- E2E tests: of Nest.js
- GraphQL: test resolvers with mock context

## Environment Variables

```
NODE_ENV="development"
DATABASE_URL="mysql://beekeeper:gay@localhost:3306/higure_db"
REDIS_URL="redis://localhost:6379"

JWT_SECRET="SUPERSECRET123"
JWT_REFRESH_SECRET="GANG1243"
JWT_EXPIRES_IN=86400000 # 24 hours
```

## Dependencies Management

- Use workspace protocol for internal packages
- Monorepo is powered by Turbo
- Keep dependencies synchronized across apps
- Regular security audits with `bun audit`
