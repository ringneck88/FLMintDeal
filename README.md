
 Production:
  - Frontend: https://flmintdeals-frontend.fly.dev
  - Backend API: https://flmintdeals-backend.fly.dev
  - Strapi Admin: https://flmintdeals-backend.fly.dev/admin

  Local Development:
  - Frontend: http://localhost:4321
  - Backend API: http://localhost:1338
  - Strapi Admin: http://localhost:1338/admin







● To edit the frontend home page in Astro, you'll
  make changes in:

  frontend/src/pages/index.astro

● Read(frontend\src\pages\index.astro)
  ⎿  Read 219 lines (ctrl+r to expand)

● This is your home page file! Here's how to edit
  it:

  File Location: frontend/src/pages/index.astro

  Key sections you can modify:

  1. Hero Section (lines 67-87): Main banner with       
  title and description
  2. Featured Deals (lines 111-154): Large
  highlighted deals
  3. All Deals (lines 157-199): Smaller deal grid       
  4. Call to Action (lines 202-217): Email signup       
  section

  To make changes:
  1. Edit the file locally
  2. Test locally: cd frontend && npm run dev
  3. Deploy: cd frontend && flyctl deploy

  Current features:
  - Uses sample data (lines 6-51)
  - Connects to Strapi backend (line 54)
  - Responsive design with Tailwind CSS
  - Status indicators showing backend connection        

  You can modify the text, colors, layout, or
  replace the sample data with real Strapi content      
  by updating the API calls in the frontmatter
  section (lines 1-63).



## ● Perfect! Now the Swagger documentation should be available. Try these URLs:

  Development API Documentation:
  https://flmintdeal-dev.fly.dev/documentation

  Available API endpoints you'll see:
  - GET /api/deals - List all deals
  - GET /api/deals/:id - Get specific deal
  - POST /api/deals - Create new deal (requires auth)
  - PUT /api/deals/:id - Update deal (requires auth)
  - DELETE /api/deals/:id - Delete deal (requires auth)
  - GET /api/users-permissions/users/me - Get current user
  - Authentication endpoints for login/register

  The documentation will show:
  - Interactive API testing interface
  - Request/response schemas
  - Authentication requirements
  - Field definitions for your content types
  - Example requests and responses

  To also enable it on production:
  cd backend && flyctl deploy

  This will deploy the documentation plugin to your production environment as well.        

  The Swagger UI will automatically update when you add new content types using the        
  Content Type Builder in the development admin panel!
