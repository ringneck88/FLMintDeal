# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current Repository Status

This repository appears to have been recently cleared (commit d87d15e5 "bye bye"). The git history indicates this was previously a Strapi-based project called FLMintDeals.

## Project History Context

From git history analysis, this was a deals/commerce application with the following architecture:

### Previous Tech Stack
- **Backend**: Strapi v5.21.0 (Node.js headless CMS)
- **Language**: TypeScript
- **Database**: SQLite (development)
- **Frontend**: React 18 with TypeScript
- **Deployment**: Docker + Google Cloud Build

### Previous Project Structure
```
flmintdeals/                    # Main Strapi application directory
├── config/                     # Strapi configuration
│   ├── admin.ts               # Admin panel config
│   ├── api.ts                 # API configuration
│   ├── database.ts            # Database config (SQLite)
│   ├── middlewares.ts
│   ├── plugins.ts
│   └── server.ts              # Server configuration
├── src/
│   ├── admin/                 # Admin panel customizations
│   ├── api/                   # API endpoints and content types
│   ├── extensions/            # Plugin extensions
│   └── index.ts               # Application entry point
├── database/                  # Database files and migrations
├── public/                    # Static files and uploads
├── types/                     # TypeScript type definitions
├── Dockerfile                 # Docker configuration
├── .env                       # Environment variables
└── package.json              # Dependencies and scripts
```

### Previous Commands (from git history)
```bash
# Navigate to Strapi app
cd flmintdeals

# Development
npm install                    # Install dependencies
npm run develop               # Start Strapi in development mode
npm run dev                   # Alias for develop
npm run start                 # Start in production mode

# Build & Deploy
npm run build                 # Build admin panel for production
npm run deploy               # Deploy Strapi project

# Utilities
npm run console              # Start Strapi console
npm run strapi              # Display Strapi commands
npm run upgrade             # Upgrade Strapi version
npm run upgrade:dry         # Dry run upgrade
```

### Previous Configuration Details
- Admin panel was accessible at `http://localhost:1337/admin`
- API endpoint at `http://localhost:1337/api`
- Database stored at `.tmp/data.db` (SQLite)
- JWT secrets stored in `.env`
- Docker deployment configured with cloudbuild.yaml

## Working with This Repository

### If Restoring the Project
1. The project structure and configuration can be restored from git history
2. Key commits to reference:
   - `88795ed1`: "Add Strapi project setup and documentation"
   - Earlier commits contain the full project structure

### If Starting Fresh
1. This appears to be intended for a deals/commerce application
2. Consider whether to restore the Strapi setup or start with a different stack
3. The `flmintdeals` subdirectory was the main application container

### Environment Setup
- Ensure Node.js is installed (Strapi v5.21.0 requires Node 18+)
- If restoring Strapi, SQLite will be used for development
- Docker configuration was previously set up for deployment

## Repository Context
- Main branch: `main`
- Recent activity suggests project restructuring or cleanup
- Domain appears to be deals/commerce related based on name "FLMintDeals"
- Previous setup included comprehensive TypeScript type definitions