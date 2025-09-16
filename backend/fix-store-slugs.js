#!/usr/bin/env node

/**
 * Fix Store Slugs - Add missing slug values to make stores appear in CMS
 */

const Database = require('better-sqlite3');
const path = require('path');

async function fixStoreSlugs() {
  console.log('🔧 Fixing Store Slugs');
  console.log('=====================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');

  try {
    const db = new Database(dbPath);

    // Get stores missing slugs
    console.log('🔍 Finding stores without slugs...');
    const storesWithoutSlug = db.prepare(`
      SELECT id, name FROM stores WHERE slug IS NULL OR slug = ''
    `).all();

    console.log(`Found ${storesWithoutSlug.length} stores missing slugs:`);
    storesWithoutSlug.forEach(store => {
      console.log(`   ${store.id}: ${store.name}`);
    });

    if (storesWithoutSlug.length === 0) {
      console.log('✅ All stores already have slugs!');
      db.close();
      return;
    }

    // Function to create slug from name
    function createSlug(name) {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    console.log('\n🔧 Adding slug values...');

    const updateSlug = db.prepare(`
      UPDATE stores SET slug = ?, updated_at = ? WHERE id = ?
    `);

    const now = Date.now();
    let updatedCount = 0;

    for (const store of storesWithoutSlug) {
      const slug = createSlug(store.name);

      try {
        updateSlug.run(slug, now, store.id);
        console.log(`   ✅ ${store.name} → "${slug}"`);
        updatedCount++;
      } catch (error) {
        console.log(`   ❌ Failed to update ${store.name}: ${error.message}`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Updated: ${updatedCount} stores`);
    console.log(`   ❌ Failed: ${storesWithoutSlug.length - updatedCount} stores`);

    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    const allStores = db.prepare(`
      SELECT id, name, slug FROM stores ORDER BY id
    `).all();

    allStores.forEach(store => {
      const status = store.slug ? '✅' : '❌';
      console.log(`   ${status} ${store.name}: "${store.slug || 'MISSING'}"`);
    });

    db.close();

    console.log('\n🎉 Store slugs have been fixed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Refresh your Strapi admin panel');
    console.log('   2. Go to Content Manager → Store');
    console.log('   3. You should now see all stores listed');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Install better-sqlite3 if not available
try {
  require('better-sqlite3');
  fixStoreSlugs().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      fixStoreSlugs().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}