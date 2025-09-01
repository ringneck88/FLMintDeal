# FLMintDeals Frontend - Astro Site

The frontend for FLMintDeals cannabis deals platform, built with Astro and Tailwind CSS.

## 🌐 Live Site

**Main Site**: https://flmintdeal-frontend.pages.dev

## 🏗️ Project Structure

```text
frontend/
├── src/
│   ├── pages/
│   │   └── index.astro          # Homepage - edit this for main content
│   ├── layouts/
│   │   └── Layout.astro         # Base layout template
│   ├── lib/
│   │   └── strapi.ts           # Strapi API client
│   └── components/             # Reusable components
├── public/                     # Static assets
├── dist/                      # Built site (auto-generated)
└── wrangler.toml             # Cloudflare Pages deployment config
```

## 🚀 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit: http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create `.env` file:
```bash
# For local development with local Strapi
PUBLIC_STRAPI_URL=http://localhost:1337

# For connecting to deployed Strapi
# PUBLIC_STRAPI_URL=https://flmintdeal-dev.fly.dev
```

## 📝 Editing Content

### Homepage (`src/pages/index.astro`)
Key sections you can modify:

1. **Hero Section** (lines 62-82): Main banner with title and description
2. **Featured Deals** (lines 106-165): Large highlighted deals grid
3. **All Deals** (lines 167-212): Smaller deal cards grid  
4. **Call to Action** (lines 214-231): Email signup section

### API Integration
The site automatically connects to your Strapi backend:

- **Current Backend**: `https://flmintdeal-dev.fly.dev`
- **API Client**: Located in `src/lib/strapi.ts`
- **Status Display**: Shows connection status on homepage

## 🔌 Backend Connection

### Current Status
- ✅ **Frontend**: Deployed and running
- ⚠️ **Backend**: Needs content type configuration

### Fixing Backend Connection
The frontend expects `/api/deals` but your Strapi has different content types. Fix by either:

1. **Add Deals Content Type** (Recommended):
   - Go to https://flmintdeal-dev.fly.dev/admin
   - Content-Types Builder → Create "Deal"
   - Add fields: title, description, price, originalPrice, discount, category, featured

2. **Update Frontend Code**:
   - Modify `src/pages/index.astro` lines 19-31
   - Change API calls to use existing content types (`cannabinoids-types`, etc.)

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Configuration**: `tailwind.config.mjs`
- **Responsive**: Mobile-first design
- **Theme**: Blue/purple gradient with modern card layouts

## 🚀 Deployment

### Cloudflare Pages (Current)
```bash
# Build and deploy
npm run build
wrangler pages publish dist
```

### Auto-Deployment
Connected to your repository for automatic deployments on git push.

## 🧞 Available Commands

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |
| `npm run astro`   | Run Astro CLI commands                        |

## 🔗 Related Links

- **Backend Admin**: https://flmintdeal-dev.fly.dev/admin
- **API Documentation**: https://flmintdeal-dev.fly.dev/documentation  
- **Project Documentation**: See `../CLAUDE.md`
- **Astro Docs**: https://docs.astro.build

---

*Edit `src/pages/index.astro` to customize your homepage content and styling.*