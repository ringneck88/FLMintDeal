const fs = require('fs');
const path = require('path');

/**
 * Generate slugs for existing content in SQLite database
 * This script creates slugs for deals that currently have NULL slugs
 */

// Helper function to create URL-friendly slugs
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to generate slugs using Strapi's database
async function generateSlugsInDatabase() {
  console.log('🔄 Generating slugs for existing deals...');
  
  try {
    // We'll use Strapi's built-in database connection
    const Database = require('better-sqlite3');
    const dbPath = path.join(__dirname, '.tmp', 'data.db');
    
    if (!fs.existsSync(dbPath)) {
      console.error('❌ Database file not found. Make sure Strapi has been run at least once.');
      return;
    }
    
    const db = Database(dbPath);
    
    // Get all deals with NULL slugs
    const deals = db.prepare('SELECT id, title, slug FROM deals WHERE slug IS NULL OR slug = ""').all();
    
    console.log(`📊 Found ${deals.length} deals without slugs`);
    
    if (deals.length === 0) {
      console.log('✅ All deals already have slugs!');
      db.close();
      return;
    }
    
    // Update each deal with a generated slug
    const updateStmt = db.prepare('UPDATE deals SET slug = ? WHERE id = ?');
    
    const updates = [];
    for (const deal of deals) {
      const slug = createSlug(deal.title);
      
      // Check if slug already exists
      const existingSlug = db.prepare('SELECT id FROM deals WHERE slug = ? AND id != ?').get(slug, deal.id);
      
      let finalSlug = slug;
      if (existingSlug) {
        // Add suffix if slug exists
        let counter = 1;
        while (db.prepare('SELECT id FROM deals WHERE slug = ? AND id != ?').get(`${slug}-${counter}`, deal.id)) {
          counter++;
        }
        finalSlug = `${slug}-${counter}`;
      }
      
      updates.push({ id: deal.id, title: deal.title, slug: finalSlug });
      updateStmt.run(finalSlug, deal.id);
    }
    
    db.close();
    
    console.log('✅ Successfully generated slugs:');
    updates.forEach(update => {
      console.log(`   "${update.title}" → "${update.slug}"`);
    });
    
    console.log('\n🚀 Next steps:');
    console.log('1. Restart Strapi to see the changes');
    console.log('2. Verify slugs in the admin panel');
    console.log('3. Test the frontend routes: /deal/[slug]');
    
  } catch (error) {
    console.error('❌ Error generating slugs:', error.message);
  }
}

// Alternative method: Generate SQL update statements
function generateSQLUpdates() {
  console.log('📝 Generating SQL UPDATE statements...');
  
  const updates = [
    { title: 'Gaming Laptop Deal', slug: 'gaming-laptop-deal' },
    { title: 'Wireless Headphones', slug: 'wireless-headphones' },
    { title: 'Smart Watch', slug: 'smart-watch' }
  ];
  
  console.log('\n-- SQL UPDATE statements for slugs:');
  updates.forEach(update => {
    console.log(`UPDATE deals SET slug = '${update.slug}' WHERE title = '${update.title}';`);
  });
  
  console.log('\n📋 Copy these statements and run them in your database.');
}

// Check command line arguments
const command = process.argv[2];

if (command === 'sql') {
  generateSQLUpdates();
} else if (command === 'direct' || !command) {
  generateSlugsInDatabase();
} else {
  console.log('Usage:');
  console.log('  node generate-slugs.js        # Update database directly');
  console.log('  node generate-slugs.js sql    # Generate SQL statements');
}