# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FLMintDeals is a full-stack deals/commerce website built with:
- **Backend**: Strapi v5.22.0 (headless CMS)
- **Frontend**: Astro v5.13.0 (static site generator)
- **Styling**: Tailwind CSS
- **Database**: SQLite (development), configurable for PostgreSQL (production)
- **Deployment**: Fly.io
- **Language**: TypeScript throughout

## Project Structure

```
FLMintDeal/
├── backend/                   # Strapi CMS backend
│   ├── config/               # Strapi configuration
│   ├── src/                  # API endpoints and content types
│   ├── Dockerfile            # Backend Docker configuration
│   ├── fly.toml             # Fly.io backend deployment config
│   └── package.json         # Backend dependencies
├── frontend/                 # Astro static site
│   ├── src/
│   │   ├── layouts/         # Astro layout components
│   │   ├── lib/             # Utilities (Strapi API client)
│   │   └── pages/           # Site pages
│   ├── Dockerfile           # Frontend Docker configuration
│   ├── fly.toml            # Fly.io frontend deployment config
│   ├── nginx.conf          # Nginx configuration for production
│   └── tailwind.config.mjs # Tailwind CSS configuration
├── deploy.sh               # Deployment script
├── fly-setup.sh           # Fly.io initial setup script
└── CLAUDE.md              # This file
```

## Development Commands

### Backend (Strapi)
```bash
cd backend

# Development
npm install                 # Install dependencies
npm run dev                # Start development server (http://localhost:1337)
npm run develop           # Alias for dev
npm run build             # Build for production
npm run start             # Start production server

# Utilities
npm run console           # Strapi console
npm run strapi           # Display Strapi commands
```

### Frontend (Astro)
```bash
cd frontend

# Development  
npm install               # Install dependencies
npm run dev              # Start development server (http://localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build

# Utilities
npm run astro            # Astro CLI commands
```

## Important Configuration

### Environment Variables

**Backend (.env)**:
```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate new ones for production)
APP_KEYS="key1,key2"
API_TOKEN_SALT=salt
ADMIN_JWT_SECRET=secret
TRANSFER_TOKEN_SALT=salt
JWT_SECRET=secret
ENCRYPTION_KEY=key

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Production
NODE_ENV=development
PUBLIC_URL=                    # Set to your domain in production
IS_PROXIED=true               # Set to true when behind a proxy
```

**Frontend**: Set `PUBLIC_STRAPI_URL` to point to your Strapi instance.

### API Integration

The frontend includes a Strapi API client at `frontend/src/lib/strapi.ts`:

```typescript
import { strapi } from '../lib/strapi';

// Fetch multiple items
const deals = await strapi.getMany('/deals');

// Fetch single item
const deal = await strapi.getOne('/deals', id);
```

## Deployment to Fly.io

### First-time Setup
1. Install Fly CLI: `https://fly.io/docs/hands-on/install-flyctl/`
2. Login: `fly auth login`
3. Run setup script: `./fly-setup.sh`
4. Set backend secrets (commands provided by setup script)

### Deploy Both Apps
```bash
./deploy.sh
```

### Manual Deployment
```bash
# Deploy backend
cd backend && fly deploy --app flmintdeals-backend

# Deploy frontend  
cd frontend && fly deploy --app flmintdeals-frontend
```

### Production URLs
- Frontend: `https://flmintdeals-frontend.fly.dev`
- Backend: `https://flmintdeals-backend.fly.dev`
- Strapi Admin: `https://flmintdeals-backend.fly.dev/admin`

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Create Content Types**: Access Strapi admin at `http://localhost:1337/admin`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Build Frontend API Integration**: Update `frontend/src/lib/strapi.ts` calls
5. **Deploy**: Run `./deploy.sh`

## Common Tasks

### Adding Content Types in Strapi
1. Access admin panel: `http://localhost:1337/admin`
2. Go to Content-Types Builder
3. Create new content type (e.g., "Deal")
4. Add fields and configure
5. Save and restart server

### Connecting Frontend to New Content
1. Update `frontend/src/pages/index.astro` or create new pages
2. Use the Strapi client: `await strapi.getMany('/deals')`
3. Style with Tailwind CSS classes

### Database Management
- **Development**: SQLite file at `backend/.tmp/data.db`
- **Production**: Persistent volume mounted at `/data` on Fly.io
- **Migrations**: Handled automatically by Strapi

## Architecture Notes

- **Backend Port**: 1337 (development), 8080 (production on Fly.io)
- **Frontend Port**: 4321 (development), 80 (production)
- **Database**: SQLite for development, easily configurable for PostgreSQL
- **Static Assets**: Served by Nginx in production
- **API Calls**: Made at build time (SSG) and runtime via fetch