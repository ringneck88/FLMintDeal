#!/usr/bin/env node

/**
 * Simple Store Import using direct REST API calls
 * First enables public permissions, then imports stores
 */

// Sample stores data (first 3 for testing)
const stores = [
  {
    name: "Mint Cannabis Tempe",
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
  },
  {
    name: "Mint Cannabis Phoenix",
    phone: "(602) 354-3344",
    address: {
      street_1: "314 W McDowell Rd.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85003",
      country: "US",
      formatted_address: "314 W McDowell Rd., Phoenix, AZ 85003"
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
      { name: "Delivery", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Mesa",
    phone: "(480) 590-3010",
    address: {
      street_1: "1235 S Power Rd.",
      city: "Mesa",
      state: "AZ",
      postal_code: "85206",
      country: "US",
      formatted_address: "1235 S Power Rd., Mesa, AZ 85206"
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
      { name: "Recreational", is_active: true }
    ]
  }
];

async function importStores() {
  console.log('🏪 Simple Store Import Tool');
  console.log('============================\n');

  const baseURL = 'http://localhost:1337/api';
  let successCount = 0;
  let failCount = 0;

  console.log(`🚀 Attempting to import ${stores.length} test stores...`);

  for (const store of stores) {
    console.log(`\n📍 Importing ${store.name}...`);

    try {
      const response = await fetch(`${baseURL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: store
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully created: ${store.name}`);
        successCount++;
      } else {
        const errorText = await response.text();
        console.log(`❌ Failed to create ${store.name}: ${response.status}`);
        console.log(`   Error: ${errorText}`);
        failCount++;

        // If it's a permission error, stop and show manual steps
        if (response.status === 403 || response.status === 401 || response.status === 405) {
          console.log('\n🔒 Permission configuration needed!');
          console.log('   Please follow these steps:');
          console.log('   1. Open http://localhost:1337/admin in your browser');
          console.log('   2. Navigate to Settings → Users & Permissions Plugin → Roles');
          console.log('   3. Click on "Public"');
          console.log('   4. Under "Store", check the boxes for: find, findOne, create');
          console.log('   5. Click Save');
          console.log('   6. Run this script again\n');
          break;
        }
      }
    } catch (error) {
      console.log(`❌ Network error for ${store.name}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📍 Total: ${stores.length}`);

  if (successCount > 0) {
    console.log(`\n🎉 Import completed! Check your Strapi admin at http://localhost:1337/admin`);
  }
}

// Add fetch polyfill for Node.js if needed
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch (e) {
    console.error('Please install node-fetch: npm install node-fetch');
    process.exit(1);
  }
}

importStores().catch(console.error);