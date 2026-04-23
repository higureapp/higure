<div align="center">

![banner](/assets/logo_higure.png)

# Higure

Your complete daily platform: tasks, habits, and wellness in one place.

</div>

## Docker Development Guide

This project uses Docker to run the full stack (API, Web App, PostgreSQL, Redis).

### Quick Start

```bash
# 1. Copy the environment template
cp .env.docker.example .env.docker

# 2. Start all services (database + redis + api)
docker-compose up -d postgres redis api

# 3. Run database migrations
docker-compose exec api npx prisma migrate deploy

# 4. Access the API
curl http://localhost:3000/graphql
```

### Services

| Service  | Port | Description         |
| -------- | ---- | ------------------- |
| postgres | 5432 | PostgreSQL database |
| redis    | 6379 | Redis cache         |
| api      | 3000 | NestJS GraphQL API  |
| www      | 5173 | Vue.js Web App      |

### Docker Commands

#### Development

```bash
# Start database and cache only
docker-compose up -d postgres redis

# Start API with hot reload
docker-compose --profile api up -d api

# Start Web App with hot reload
docker-compose --profile www up -d www

# Start everything
docker-compose up -d

# View logs
docker-compose logs -f api

# Run commands in container
docker-compose exec api sh
docker-compose exec api npx prisma studio
```

#### Production

```bash
# Build production images
docker build -f Dockerfile.api -t higure-api:latest .
docker build -f Dockerfile.www -t higure-www:latest .

# Run production stack
docker-compose -f docker-compose.prod.yml up -d

# Scale API instances
docker-compose -f docker-compose.prod.yml up -d --scale api=3
```

### Environment Variables

Copy `.env.docker.example` to `.env.docker` and configure:

```env
# Database
DB_USER=beekeeper
DB_PASSWORD=your_secure_password
DB_NAME=higure_db

# Redis
REDIS_PORT=6379

# API
API_PORT=3000
JWT_SECRET=change_this_in_production
JWT_REFRESH_SECRET=change_this_in_production

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Nginx (reverse proxy)                │
│                   (SSL termination)                    │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴────────────────┐
            ▼                             ▼
    ┌─────────────────┐            ┌─────────────────┐
    │   Web App (www) │            │    API (NestJS)  │
    │     :80        │            │     :3000        │
    └─────────────────┘            └─────────────────┘
                                          │
                            ┌────────────┴────────────┐
                            ▼                         ▼
                    ┌──────────────┐        ┌──────────────┐
                    │  PostgreSQL  │        │    Redis     │
                    │    :5432     │        │    :6379     │
                    └──────────────┘        └──────────────┘
```

### Performance Features

- Multi-stage Docker builds (smaller images)
- Alpine-based images (minimal footprint)
- Nginx for static file serving and load balancing
- Redis caching with LRU eviction policy
- Gzip compression enabled
- Connection pooling in PostgreSQL
- Health checks for all services
- Resource limits in docker-compose.prod.yml

### Troubleshooting

```bash
# Check service health
docker-compose ps

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart api

# Rebuild after dependency changes
docker-compose build --no-cache api

# Clean up volumes (WARNING: destroys data)
docker-compose down -v
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup without Docker.
