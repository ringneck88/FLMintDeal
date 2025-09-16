#!/usr/bin/env node

/**
 * Publish Stores - Make sure stores are published so they appear in API
 */

const Database = require('better-sqlite3');
const path = require('path');

async function publishStores() {
  console.log('📰 Publishing Stores');
  console.log('===================\n');

  const dbPath = path.join(__dirname, '.tmp', 'data.db');

  try {
    const db = new Database(dbPath);

    // Check current store status
    console.log('🔍 Checking store publication status...');
    const stores = db.prepare(`
      SELECT id, name, published_at FROM stores
    `).all();

    console.log(`Found ${stores.length} stores:`);
    stores.forEach(store => {
      const status = store.published_at ? 'Published' : 'Draft';
      console.log(`   - ${store.name} (ID: ${store.id}) - ${status}`);
    });

    // Update all stores to be published
    console.log('\n📢 Publishing all stores...');

    const now = Date.now();
    const updateStores = db.prepare(`
      UPDATE stores
      SET published_at = ?, updated_at = ?
      WHERE published_at IS NULL
    `);

    const result = updateStores.run(now, now);
    console.log(`✅ Published ${result.changes} stores`);

    // Verify publication
    console.log('\n🔍 Verifying publication...');
    const publishedStores = db.prepare(`
      SELECT id, name, published_at FROM stores
    `).all();

    publishedStores.forEach(store => {
      const status = store.published_at ? 'Published' : 'Draft';
      console.log(`   - ${store.name} (ID: ${store.id}) - ${status}`);
    });

    db.close();

    console.log('\n🎉 All stores are now published and should be available via API!');
    console.log('\n🔗 Test the API:');
    console.log('   curl http://localhost:1337/api/stores');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Install better-sqlite3 if not available
try {
  require('better-sqlite3');
  publishStores().catch(console.error);
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  const { spawn } = require('child_process');
  const install = spawn('npm', ['install', 'better-sqlite3'], { stdio: 'inherit' });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ better-sqlite3 installed, retrying...');
      delete require.cache[require.resolve('better-sqlite3')];
      publishStores().catch(console.error);
    } else {
      console.error('❌ Failed to install better-sqlite3');
    }
  });
}