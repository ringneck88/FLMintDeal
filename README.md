# FLMintDeals - Full-Stack Cannabis Deals Platform

A modern full-stack deals/commerce website built with Strapi (headless CMS) and Astro (static site generator), now running with PostgreSQL database.

## 🌐 Live Deployment URLs

### Current Production URLs
- **Frontend (Main Site)**: https://flmintdeal-frontend.pages.dev
- **Backend API**: https://flmintdeal-dev.fly.dev/api/*
- **Admin Panel**: https://flmintdeal-dev.fly.dev/admin
- **API Documentation**: https://flmintdeal-dev.fly.dev/documentation

### Local Development URLs
- **Frontend**: http://localhost:4321
- **Backend API**: http://localhost:1337/api/*
- **Admin Panel**: http://localhost:1337/admin
- **PostgreSQL Database**: localhost:5432 (via Docker)

## 🏗️ Project Structure

```
FLMintDeal/
├── backend/                   # Strapi v5.22.0 CMS backend
│   ├── config/               # Strapi configuration
│   ├── src/                  # API endpoints and content types
│   ├── fly.toml             # Production deployment config
│   ├── fly.dev.toml         # Development deployment config
│   └── Dockerfile.dev       # Development container
├── frontend/                 # Astro v5.13.0 static site
│   ├── src/pages/           # Site pages (index.astro = main page)
│   ├── src/lib/             # Utilities (Strapi API client)
│   ├── wrangler.toml       # Cloudflare Pages configuration
│   └── dist/               # Built static files
└── CLAUDE.md              # Detailed setup instructions
```

## 🚀 Quick Start

### Prerequisites
1. **Docker Desktop** - Required for PostgreSQL database
2. **Node.js** v18+ - For running the applications

### Database Setup (PostgreSQL)
```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d postgres

# Verify PostgreSQL is running
docker ps | grep postgres
```

### Backend (Strapi CMS)
```bash
cd backend
npm install
npm run dev                 # Development mode
# Access admin at http://localhost:1337/admin
```

### Frontend (Astro Site)
```bash
cd frontend
npm install
npm run dev                 # Development mode
# Access site at http://localhost:4321
```

## 🔑 Development Credentials

### PostgreSQL Database
- **Host**: localhost
- **Port**: 5432
- **Database**: flmintdeal_dev
- **Username**: postgres
- **Password**: postgres
- **Connection String**: `postgresql://postgres:postgres@localhost:5432/flmintdeal_dev`

### Strapi Admin Panel
- **URL**: http://localhost:1337/admin
- **Note**: Create your first admin user when accessing for the first time

## 📝 Content Management

### Available Content Types
- **Brands**: Cannabis brand information (2 entries)
- **Cities**: Florida cities with dispensaries (14 entries)
- **Stores**: Dispensary locations (6 entries)
- **Regions**: Geographic regions (8 entries)
- **Dosage Forms**: Product delivery methods (7 entries)
- **Deals**: Cannabis deals and promotions
- **Announcements**: Site announcements
- **Events**: Cannabis events
- **Jobs**: Employment opportunities
- **Pages**: Static pages

### Admin Access
- **URL**: https://flmintdeal-dev.fly.dev/admin
- **Development**: Running in development mode with hot-reload

## 🔌 API Integration

The frontend automatically connects to the backend API:

**API Base URL**: `https://flmintdeal-dev.fly.dev`

**Example API Endpoints**:
- `GET /api/brands` - List cannabis brands
- `GET /api/stores` - List dispensary stores
- `GET /api/cities` - List cities with dispensaries
- `GET /api/dosage-forms` - List dosing forms
- `GET /api/deals` - List cannabis deals
- `GET /api/regions` - List geographic regions

**Note**: API endpoints may return 404 until permissions are configured in the admin panel.

## 🎯 Current Status

✅ **Database**: PostgreSQL running via Docker with migrated data
✅ **Backend**: Running on PostgreSQL with 99 imported entities
✅ **Frontend**: Running and connected to backend
✅ **Data Migration**: Complete - all SQLite data successfully migrated to PostgreSQL
⚠️ **API Permissions**: May need configuration in admin panel for public access

### Migration Completed
All data has been successfully migrated from SQLite to PostgreSQL:
- **99 entities** including brands, stores, cities, regions, dosage forms
- **1.3MB** of content including assets and configurations
- **Complete data integrity** preserved during migration

## 🚀 Deployment Instructions

### Frontend Deployment (Cloudflare Pages)

After making changes to the frontend, deploy using these commands:

```bash
cd frontend

# 1. Build the Astro site
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

**Alternative one-command deploy:**
```bash
cd frontend
npm run deploy  # Runs build + deploy automatically
```

**Expected output:**
- Build creates optimized static files in `dist/` directory
- Deploy uploads to Cloudflare Pages and provides deployment URL
- New deployment URL format: `https://[hash].flmintdeal-frontend.pages.dev`

### Backend Deployment (Fly.io)

The backend is already deployed and running. Changes require redeployment:

```bash
cd backend
fly deploy --app flmintdeal  # Production backend
```

## 🛠️ Development Workflow

1. **Edit Content**: Use Strapi admin panel to add/edit content
2. **Frontend Changes**: Edit `frontend/src/pages/index.astro` for homepage
3. **API Changes**: Modify content types in Strapi admin
4. **Deploy Frontend**: Use `npm run deploy` in frontend directory
5. **Deploy Backend**: Use `fly deploy` if backend changes are made

## 📚 Technology Stack

- **Backend**: Strapi v5.22.0 (Node.js, SQLite/PostgreSQL)
- **Frontend**: Astro v5.13.0 (TypeScript, Tailwind CSS)
- **Deployment**: 
  - Backend: Fly.io
  - Frontend: Cloudflare Pages
- **Database**: PostgreSQL (development and production)

## 📖 Documentation

- Full setup instructions: See `CLAUDE.md`
- API documentation: Available at `/documentation` endpoint
- Strapi docs: [strapi.io/documentation](https://strapi.io/documentation)
- Astro docs: [docs.astro.build](https://docs.astro.build)

---

*This project was set up with development-first approach for easy content management and rapid iteration.*