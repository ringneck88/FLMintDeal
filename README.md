# FLMintDeals - Full-Stack Cannabis Deals Platform

A modern full-stack deals/commerce website built with Strapi (headless CMS) and Astro (static site generator).

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

## 📝 Content Management

### Available Content Types
- **Cannabinoids Types**: Cannabis compound information
- **Dosing Forms**: Product delivery methods
- **Ingredients**: Product ingredients
- **Dosage Products**: Cannabis products
- **Unit Types**: Measurement units

### Admin Access
- **URL**: https://flmintdeal-dev.fly.dev/admin
- **Development**: Running in development mode with hot-reload

## 🔌 API Integration

The frontend automatically connects to the backend API:

**API Base URL**: `https://flmintdeal-dev.fly.dev`

**Example API Endpoints**:
- `GET /api/cannabinoids-types` - List cannabinoid types
- `GET /api/dosing-forms` - List dosing forms
- `GET /api/ingredients` - List ingredients
- `GET /api/dosage-products` - List products

## 🎯 Current Status

✅ **Backend**: Deployed and running in development mode  
✅ **Frontend**: Deployed on Cloudflare Pages  
⚠️ **API Connection**: Frontend needs configuration update to connect to backend  

### Known Issue
The frontend is currently looking for `/api/deals` but the backend has different content types. This can be resolved by:
1. Adding a "deals" content type in Strapi admin, or
2. Updating the frontend to use existing content types

## 🛠️ Development Workflow

1. **Edit Content**: Use Strapi admin panel to add/edit content
2. **Frontend Changes**: Edit `frontend/src/pages/index.astro` for homepage
3. **API Changes**: Modify content types in Strapi admin
4. **Deploy**: Changes auto-deploy via connected repositories

## 📚 Technology Stack

- **Backend**: Strapi v5.22.0 (Node.js, SQLite/PostgreSQL)
- **Frontend**: Astro v5.13.0 (TypeScript, Tailwind CSS)
- **Deployment**: 
  - Backend: Fly.io
  - Frontend: Cloudflare Pages
- **Database**: SQLite (development), PostgreSQL (production capable)

## 📖 Documentation

- Full setup instructions: See `CLAUDE.md`
- API documentation: Available at `/documentation` endpoint
- Strapi docs: [strapi.io/documentation](https://strapi.io/documentation)
- Astro docs: [docs.astro.build](https://docs.astro.build)

---

*This project was set up with development-first approach for easy content management and rapid iteration.*