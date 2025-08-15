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
