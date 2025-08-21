fo# FLMintDeals Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                FLMintDeals Architecture                              │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                  DEVELOPMENT ENVIRONMENTS
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  LOCAL DEVELOPMENT                           FLY.IO DEV INSTANCE                   │
│  ╭─────────────────╮                        ╭─────────────────────╮               │
│  │   Frontend      │◄──── API calls ──────►│  flmintdeal-dev     │               │
│  │ localhost:4321  │                        │ (SUSPENDED)         │               │
│  │                 │                        │ Port: 1337          │               │
│  │ • Astro v5.13   │                        │ • Strapi v5.22      │               │
│  │ • Tailwind CSS  │                        │ • Node.js 20        │               │
│  │ • Static Site   │                        │ • SQLite @ /data    │               │
│  ╰─────────────────╯                        ╰─────────────────────╯               │
│           │                                            │                           │
│           │ Connects to                                │ Volume Mount              │
│           ▼                                            ▼                           │
│  ╭─────────────────╮                        ╭─────────────────────╮               │
│  │   Backend       │                        │  Persistent Volume  │               │
│  │ localhost:1337  │                        │  /data (1GB)        │               │
│  │                 │                        │  └─ data.db         │               │
│  │ • Strapi v5.22  │                        ╰─────────────────────╯               │
│  │ • Admin Panel   │                                                               │
│  │ • SQLite @ .tmp │                                                               │
│  │ • 937KB data.db │                                                               │
│  ╰─────────────────╯                                                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                  PRODUCTION DEPLOYMENT
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                   FLY.IO CLOUD                                     │
│                                                                                     │
│  ╭─────────────────╮                                    ╭─────────────────────╮   │
│  │ flmintdeal-     │◄──── PUBLIC_STRAPI_URL ──────────►│   flmintdeal        │   │
│  │ frontend        │      https://flmintdeal.fly.dev    │   (Backend)         │   │
│  │ (SUSPENDED)     │                                    │   (SUSPENDED)       │   │
│  │                 │                                    │                     │   │
│  │ • Nginx Proxy   │                                    │ • Strapi CMS        │   │
│  │ • Static Assets │                                    │ • Admin Panel       │   │
│  │ • Port: 80      │                                    │ • Port: 8080        │   │
│  │ • 512MB RAM     │                                    │ • 1GB RAM           │   │
│  │ • Auto-suspend  │                                    │ • Auto-suspend      │   │
│  ╰─────────────────╯                                    ╰─────────────────────╯   │
│                                                                    │               │
│                                                                    │ Persistent    │
│                                                                    ▼ Storage       │
│                                                          ╭─────────────────────╮   │
│                                                          │  Volume Mount       │   │
│                                                          │  /data (1GB)        │   │
│                                                          │  └─ data.db         │   │
│                                                          ╰─────────────────────╯   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                   CONTENT STRUCTURE
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                STRAPI CONTENT TYPES                                │
│                                                                                     │
│  ╭─────────────────╮                              ╭─────────────────────╮          │
│  │     Deal        │                              │   Dosage Form       │          │
│  │                 │                              │                     │          │
│  │ • title*        │                              │ • Name              │          │
│  │ • description   │                              │ • Discription       │          │
│  │ • price         │                              │                     │          │
│  │ • originalPrice │                              │ Collection Type     │          │
│  │ • discount      │                              │ Draft & Publish     │          │
│  │ • category      │                              │                     │          │
│  │ • featured      │                              │                     │          │
│  │ • slug (auto)   │                              │                     │          │
│  │                 │                              │                     │          │
│  │ Collection Type │                              │                     │          │
│  │ Draft & Publish │                              │                     │          │
│  ╰─────────────────╯                              ╰─────────────────────╯          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                  DATA FLOW & API
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  Frontend (Astro)                          Backend (Strapi)                        │
│  ╭─────────────────╮                      ╭─────────────────────╮                 │
│  │  Static Pages   │                      │   REST API          │                 │
│  │                 │    HTTP Requests     │                     │                 │
│  │ • /             │ ─────────────────────► │ /api/deals         │                 │
│  │ • /deal/[slug]  │                      │ /api/dosage-forms   │                 │
│  │ • /dosage-form/ │                      │ /admin              │                 │
│  │ • /dosage-      │ ◄─────────────────── │                     │                 │
│  │   products      │    JSON Responses    │ • Authentication    │                 │
│  │                 │                      │ • Content Mgmt      │                 │
│  │ Strapi Client:  │                      │ • File Uploads      │                 │
│  │ • getMany()     │                      │ • User Permissions  │                 │
│  │ • getOne()      │                      │                     │                 │
│  ╰─────────────────╯                      ╰─────────────────────╯                 │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                  DEPLOYMENT FLOW
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  Local Development                        Deploy Script                            │
│  ╭─────────────────╮                     ╭─────────────────────╮                  │
│  │   Developer     │                     │   ./deploy.sh       │                  │
│  │                 │ ──── Runs ─────────► │                     │                  │
│  │ • Code changes  │                     │ 1. Deploy backend   │                  │
│  │ • Git commits   │                     │    (flmintdeal)     │                  │
│  │ • Test locally  │                     │                     │                  │
│  │                 │                     │ 2. Deploy frontend  │                  │
│  ╰─────────────────╯                     │    (flmintdeal-     │                  │
│                                          │     frontend)       │                  │
│                                          ╰─────────────────────╯                  │
│                                                    │                               │
│                                                    ▼                               │
│  ╭─────────────────────────────────────────────────────────────────╮              │
│  │                     FLY.IO APPS                                │              │
│  │                                                                 │              │
│  │  ✅ flmintdeal          ⚠️ flmintdeal-dev    ⚠️ flmintdeal-    │              │
│  │     (Production)          (Development)        frontend        │              │
│  │     SUSPENDED             SUSPENDED            SUSPENDED       │              │
│  ╰─────────────────────────────────────────────────────────────────╯              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                 DATABASE CONFIGURATIONS
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  Environment Detection in database.ts:                                             │
│                                                                                     │
│  ╭─────────────────╮        ╭─────────────────╮        ╭─────────────────╮        │
│  │     Local       │        │   Fly.io Dev    │        │  Fly.io Prod    │        │
│  │                 │        │                 │        │                 │        │
│  │ Path:           │        │ Path:           │        │ Path:           │        │
│  │ .tmp/data.db    │        │ /data/data.db   │        │ /data/data.db   │        │
│  │                 │        │                 │        │                 │        │
│  │ Detection:      │        │ Detection:      │        │ Detection:      │        │
│  │ !FLY_APP_NAME   │        │ FLY_APP_NAME    │        │ FLY_APP_NAME    │        │
│  │                 │        │                 │        │                 │        │
│  │ 937KB active    │        │ Volume mount    │        │ Volume mount    │        │
│  ╰─────────────────╯        ╰─────────────────╯        ╰─────────────────╯        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                    PROJECT FILES
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│  FLMintDeal/                                                                        │
│  ├── backend/              # Strapi CMS                                            │
│  │   ├── src/api/          # Content types (Deal, Dosage-Form)                    │
│  │   ├── config/           # Database, admin, server configs                      │
│  │   ├── .tmp/data.db      # Local SQLite database (937KB)                       │
│  │   ├── fly.toml          # Production deployment config                         │
│  │   ├── fly.dev.toml      # Development deployment config                       │
│  │   └── Dockerfile.dev    # Development Docker image                            │
│  │                                                                                 │
│  ├── frontend/             # Astro static site                                    │
│  │   ├── src/              # Pages, layouts, components                          │
│  │   ├── src/lib/strapi.ts # API client                                          │
│  │   ├── fly.toml          # Frontend deployment config                          │
│  │   └── nginx.conf        # Production web server                               │
│  │                                                                                 │
│  ├── deploy.sh             # Deployment automation                                │
│  ├── fly-setup.sh          # Initial Fly.io setup                                │
│  └── CLAUDE.md             # Project documentation                                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

Legend:
• ✅ Deployed/Active    • ⚠️ Suspended    • * Required field    • → Data flow
```