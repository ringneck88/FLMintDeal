#!/usr/bin/env node

/**
 * Test API permissions and create a single test store
 */

const testStore = {
  name: "Test Store - Mint Cannabis Tempe",
  phone: "(480) 749-6468",
  address: {
    street_1: "5210 S Priest Dr.",
    city: "Tempe",
    state: "AZ",
    postal_code: "85283",
    country: "US",
    formatted_address: "5210 S Priest Dr., Tempe, AZ 85283"
  },
  timezone: "America/Phoenix",
  is_active: true,
  hours: {
    monday_open: "00:00:00.000",
    monday_close: "23:59:59.000",
    tuesday_open: "00:00:00.000",
    tuesday_close: "23:59:59.000",
    wednesday_open: "00:00:00.000",
    wednesday_close: "23:59:59.000",
    thursday_open: "00:00:00.000",
    thursday_close: "23:59:59.000",
    friday_open: "00:00:00.000",
    friday_close: "23:59:59.000",
    saturday_open: "00:00:00.000",
    saturday_close: "23:59:59.000",
    sunday_open: "00:00:00.000",
    sunday_close: "23:59:59.000",
    timezone: "America/Phoenix",
    notes: "Open 24 hours"
  },
  services: [
    { name: "Medical", is_active: true },
    { name: "Recreational", is_active: true },
    { name: "Cafe", is_active: true }
  ]
};

async function testPermissions() {
  console.log('🧪 Testing API Permissions');
  console.log('==========================\n');

  const baseURL = 'http://localhost:1337/api';

  // Test 1: Check if we can read stores
  console.log('📖 Testing read permissions (GET /api/stores)...');
  try {
    const readResponse = await fetch(`${baseURL}/stores`);
    console.log(`   Status: ${readResponse.status}`);

    if (readResponse.ok) {
      const data = await readResponse.json();
      console.log(`   ✅ Read permission working! Found ${data.data.length} existing stores`);
    } else {
      const errorText = await readResponse.text();
      console.log(`   ❌ Read permission failed: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
    return false;
  }

  // Test 2: Try to create a test store
  console.log('\n📝 Testing create permissions (POST /api/stores)...');
  try {
    const createResponse = await fetch(`${baseURL}/stores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: testStore
      })
    });

    console.log(`   Status: ${createResponse.status}`);

    if (createResponse.ok) {
      const result = await createResponse.json();
      console.log(`   ✅ Create permission working! Created store with ID: ${result.data.id}`);
      console.log(`   📍 Store name: ${result.data.name}`);
      return true;
    } else {
      const errorText = await createResponse.text();
      console.log(`   ❌ Create permission failed: ${errorText}`);

      if (createResponse.status === 403 || createResponse.status === 401 || createResponse.status === 405) {
        console.log('\n🔧 Permission Configuration Needed:');
        console.log('   1. Open http://localhost:1337/admin');
        console.log('   2. Go to Settings → Users & Permissions Plugin → Roles');
        console.log('   3. Click on "Public"');
        console.log('   4. Under "Store", enable: find, findOne, create');
        console.log('   5. Click Save');
        console.log('   6. Run this test again: node scripts/test-permissions.js\n');
      }
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
    return false;
  }
}

// Add fetch polyfill for Node.js if needed
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch (e) {
    // Try using Node.js 18+ built-in fetch
    if (typeof globalThis.fetch !== 'undefined') {
      global.fetch = globalThis.fetch;
    } else {
      console.error('❌ Fetch not available. Please use Node.js 18+ or install node-fetch');
      process.exit(1);
    }
  }
}

testPermissions().then(success => {
  if (success) {
    console.log('\n🎉 All permissions are working correctly!');
    console.log('   You can now run the full store import script.');
  } else {
    console.log('\n⚠️  Please configure permissions and try again.');
  }
}).catch(console.error);