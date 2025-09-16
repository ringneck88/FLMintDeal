#!/usr/bin/env node

/**
 * Import MintDeals.com Categories into Dosage Forms
 * Populates the dosage-form content type with categories from MintDeals.com
 */

const Database = require('better-sqlite3');
const path = require('path');

function importMintDealsCategories() {
  console.log('🌿 Importing MintDeals.com Categories into Dosage Forms');
  console.log('==================================================\n');

  // Connect to SQLite database
  const dbPath = path.join(__dirname, '.tmp', 'data.db');
  const db = new Database(dbPath);

  // MintDeals.com categories from research
  const categories = [
    {
      title: 'Flower',
      description: 'Premium cannabis flower for smoking and vaporizing. Available in various strains including Indica, Sativa, and Hybrid varieties.',
      seo_slug: 'flower'
    },
    {
      title: 'Pre-Rolls',
      description: 'Ready-to-smoke pre-rolled joints made with high-quality cannabis flower. Convenient and consistent dosing.',
      seo_slug: 'pre-rolls'
    },
    {
      title: 'Vaporizers',
      description: 'Cannabis vaporizer cartridges and pods for clean, efficient consumption. Compatible with various vaping devices.',
      seo_slug: 'vaporizers'
    },
    {
      title: 'Concentrates',
      description: 'High-potency cannabis concentrates including shatter, wax, live resin, and rosin. For experienced users.',
      seo_slug: 'concentrates'
    },
    {
      title: 'Edibles',
      description: 'Cannabis-infused food products including gummies, chocolates, beverages, and baked goods. Precise dosing and long-lasting effects.',
      seo_slug: 'edibles'
    },
    {
      title: 'Topicals',
      description: 'Cannabis-infused topical products including balms, lotions, and salves for localized relief without psychoactive effects.',
      seo_slug: 'topicals'
    },
    {
      title: 'Cartridges',
      description: 'Cannabis oil cartridges for vape pens. Available in various strains and potencies for discrete consumption.',
      seo_slug: 'cartridges'
    }
  ];

  console.log(`📦 Found ${categories.length} categories to import\n`);

  // Clear existing dosage forms
  console.log('🗑️  Clearing existing dosage forms...');
  db.exec(`DELETE FROM dosage_forms`);
  console.log('✅ Cleared existing dosage forms\n');

  // Insert categories as dosage forms
  const insertStmt = db.prepare(`
    INSERT INTO dosage_forms (
      document_id, title, description, seo_title_slug,
      published_at, created_at, updated_at, created_by_id, updated_by_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const timestamp = new Date().toISOString();

  categories.forEach((category, index) => {
    const documentId = `dosage-form-${index + 1}`;

    console.log(`📝 Adding: ${category.title}`);
    console.log(`   Description: ${category.description.substring(0, 80)}...`);
    console.log(`   SEO Slug: ${category.seo_slug}\n`);

    insertStmt.run(
      documentId,                    // document_id
      category.title,                // title
      category.description,          // description
      category.seo_slug,            // seo_title_slug
      timestamp,                     // published_at
      timestamp,                     // created_at
      timestamp,                     // updated_at
      1,                            // created_by_id (admin user)
      1                             // updated_by_id (admin user)
    );
  });

  console.log('🎉 Successfully imported all MintDeals.com categories!');
  console.log(`\n📊 Summary:`);
  console.log(`   • ${categories.length} dosage forms created`);
  console.log(`   • All categories have SEO-friendly slugs`);
  console.log(`   • Descriptions optimized for customer education`);

  db.close();

  console.log('\n🔗 Next Steps:');
  console.log('   1. Configure API permissions for dosage-forms in Strapi admin');
  console.log('   2. Visit http://localhost:1337/admin to view the categories');
  console.log('   3. Categories will be available at /api/dosage-forms once permissions are set');

  console.log('\n✨ Categories imported successfully!');
}

// Run the import
importMintDealsCategories();