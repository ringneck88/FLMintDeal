const Database = require('better-sqlite3');
const path = require('path');

/**
 * Update slugs directly using better-sqlite3
 */

const dbPath = path.join(__dirname, '.tmp', 'data.db');

try {
  const db = Database(dbPath);
  
  console.log('🔄 Updating deal slugs...');
  
  // Check current slugs
  const currentDeals = db.prepare('SELECT id, title, slug FROM deals').all();
  console.log('\n📊 Current deals:');
  currentDeals.forEach(deal => {
    console.log(`   ID ${deal.id}: "${deal.title}" → slug: ${deal.slug || 'NULL'}`);
  });
  
  // Update slugs
  const updates = [
    { title: 'Gaming Laptop Deal', slug: 'gaming-laptop-deal' },
    { title: 'Wireless Headphones', slug: 'wireless-headphones' },
    { title: 'Smart Watch', slug: 'smart-watch' }
  ];
  
  console.log('\n🔄 Applying updates...');
  const updateStmt = db.prepare('UPDATE deals SET slug = ? WHERE title = ?');
  
  updates.forEach(update => {
    const result = updateStmt.run(update.slug, update.title);
    console.log(`   ✅ "${update.title}" → "${update.slug}" (${result.changes} rows updated)`);
  });
  
  // Verify updates
  console.log('\n📊 Updated deals:');
  const updatedDeals = db.prepare('SELECT id, title, slug FROM deals').all();
  updatedDeals.forEach(deal => {
    console.log(`   ID ${deal.id}: "${deal.title}" → slug: ${deal.slug || 'NULL'}`);
  });
  
  db.close();
  console.log('\n✅ Slug update complete!');
  console.log('\n🚀 Next steps:');
  console.log('1. Start Strapi: npm run develop');
  console.log('2. Check admin panel: http://localhost:1337/admin');
  console.log('3. Test frontend routes: /deal/gaming-laptop-deal');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}