// Simple test to create a store via Strapi's entity service
// Run this with: node backend/test-store-creation.js

async function testStoreCreation() {
  try {
    // Test if we can directly query existing stores using raw SQL approach
    console.log('🔍 Testing store creation and visibility...\n');

    const { execSync } = require('child_process');

    // Check current stores count
    const countResult = execSync('docker exec flmintdeal-postgres psql -U postgres -d flmintdeal_dev -c "SELECT COUNT(*) FROM stores;"', { encoding: 'utf8' });
    console.log('Current stores in database:');
    console.log(countResult);

    // List current stores
    const listResult = execSync('docker exec flmintdeal-postgres psql -U postgres -d flmintdeal_dev -c "SELECT id, document_id, name FROM stores ORDER BY id;"', { encoding: 'utf8' });
    console.log('Store list:');
    console.log(listResult);

    // Try to create a simple test store with proper Strapi format
    console.log('Creating a test store via SQL...');
    const createStore = `
      INSERT INTO stores (document_id, name, slug, is_active, created_at, updated_at, published_at)
      VALUES ('test-store-${Date.now()}', 'Test Store Via Script', 'test-store-via-script', true, NOW(), NOW(), NOW())
      RETURNING id, document_id, name;
    `;

    const createResult = execSync(`docker exec flmintdeal-postgres psql -U postgres -d flmintdeal_dev -c "${createStore}"`, { encoding: 'utf8' });
    console.log('Store creation result:');
    console.log(createResult);

    console.log('\n✅ Test completed. Check the Content Manager now.');
    console.log('If stores still don\'t appear, the issue might be with Strapi Content Manager configuration.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testStoreCreation();