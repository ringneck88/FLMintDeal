# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FLMintDeals is a deals/commerce application built with Strapi v5.21.0 as the headless CMS backend. The project uses TypeScript, React, and SQLite as the database.

## Development Setup

Navigate to the Strapi application directory and install dependencies:

```bash
cd flmintdeals
npm install
```

## Important Commands

### Development
```bash
npm run develop     # Start Strapi in development mode with auto-reload
npm run dev        # Alias for develop
npm run start      # Start Strapi in production mode
```

### Build & Deploy
```bash
npm run build      # Build Strapi admin panel for production
npm run deploy     # Deploy Strapi project
```

### Utilities
```bash
npm run console    # Start Strapi console
npm run strapi     # Display all available Strapi commands
npm run upgrade    # Upgrade Strapi to latest version
npm run upgrade:dry # Dry run upgrade to see what would change
```

## Project Structure

```
flmintdeals/
├── config/          # Strapi configuration files
│   ├── admin.ts     # Admin panel configuration
│   ├── api.ts       # API configuration
│   ├── database.ts  # Database configuration (SQLite)
│   ├── middlewares.ts
│   ├── plugins.ts
│   └── server.ts    # Server configuration
├── src/
│   ├── admin/       # Admin panel customizations
│   ├── api/         # API endpoints and content types
│   ├── extensions/  # Plugin extensions
│   └── index.ts     # Application entry point
├── database/        # Database files and migrations
├── public/          # Static files and uploads
└── types/           # TypeScript type definitions
```

## Architecture Notes

- **Backend**: Strapi v5.21.0 (Node.js headless CMS)
- **Database**: SQLite (development) - located at `.tmp/data.db`
- **Frontend Framework**: React 18 with TypeScript
- **Admin Panel**: Available at `http://localhost:1337/admin`
- **API Endpoint**: `http://localhost:1337/api`

## Content Management

- Access the admin panel at `http://localhost:1337/admin` after running `npm run develop`
- Create content types through the Content-Types Builder
- Manage content through the Content Manager
- Configure user permissions via Users & Permissions plugin

## Environment Configuration

- JWT secret is automatically generated and stored in `.env`
- Database configuration in `config/database.ts`
- Server settings in `config/server.ts`