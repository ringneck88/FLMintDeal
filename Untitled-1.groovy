 What is a Slug?

  A slug is a URL-friendly version of a
  title or name. It's the part of a URL
  that identifies a specific piece of
  content in a human-readable way.

  ★ Insight
  ─────────────────────────────────────
  Slugs serve three main purposes: (1)
  SEO - search engines love readable
  URLs, (2) User Experience - users can
  understand what the page is about from
   the URL, and (3) Technical - they
  provide a unique identifier that's
  safe to use in URLs without special
  characters or spaces.
  ──────────────────────────────────────
  ───────────

  Examples of Slugs:

  Title → Slug → URL
  - "Gaming Laptop Deal" →
  gaming-laptop-deal →
  /deal/gaming-laptop-deal
  - "Wireless Headphones" →
  wireless-headphones →
  /deal/wireless-headphones
  - "Best Smart TV 2024" →
  best-smart-tv-2024 →
  /deal/best-smart-tv-2024

  How Slugs Work in Your Project:

  1. In Strapi (Backend):

  {
    "id": 1,
    "title": "Gaming Laptop Deal",
    "slug": "gaming-laptop-deal",  // ←
  This is the slug
    "price": 899.99
  }

  2. In Astro Dynamic Routes:

  File: src/pages/deal/[slug].astro
  // Get the slug from URL:
  /deal/gaming-laptop-deal
  const { slug } = Astro.params;  //
  slug = "gaming-laptop-deal"

  // Find the deal with matching slug
  const deals = await
  strapi.getMany('/deals');
  const deal = deals.data.find(d =>
  d.slug === slug);

  3. Slug Generation Rules:

  - Lowercase: "Gaming Laptop" → "gaming
   laptop"
  - Replace spaces with hyphens: "gaming
   laptop" → "gaming-laptop"
  - Remove special characters: "Best TV
  (2024)!" → "best-tv-2024"
  - Remove extra hyphens:
  "gaming--laptop" → "gaming-laptop"

  Code Example from Your Project:

  In frontend/src/pages/deal/[slug].astr
  o:18, you have:
  const dealSlug = d.slug || d.title?.to
  LowerCase().replace(/[^a-z0-9]+/g,
  '-') || `deal-${d.id}`;

  This creates a fallback system:
  1. Use the slug from Strapi (if it
  exists)
  2. Generate from title (convert to
  lowercase, replace non-alphanumeric
  with hyphens)
  3. Use ID as fallback (deal-1, deal-2,
   etc.)

  Benefits of Slugs:

  ✅ SEO-friendly:
  /deal/gaming-laptop-deal vs /deal?id=1
  ✅ Memorable: Users can guess/remember
   URLs
  ✅ Shareable: Clean URLs look
  professional
  ✅ Flexible: Can change without
  breaking if you keep the slug the same

  In Your Database:

  Looking at your
  backend/data-export/deals.json:144, I
  see:
  {
    "title": "Gaming Laptop Deal",
    "slug": null  // ← This is why your
  frontend generates it from the title
  }

  You could set slugs in Strapi admin to
   have more control over your URLs!