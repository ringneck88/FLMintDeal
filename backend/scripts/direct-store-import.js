#!/usr/bin/env node

/**
 * Direct Store Import using Strapi's content manager
 * This script creates stores by directly going to the admin panel API
 */

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
  }
];

async function importStoresDirectly() {
  console.log('🏪 Direct Store Import Tool');
  console.log('===========================\n');

  console.log('⚠️  This script requires manual permission configuration.');
  console.log('📋 Please follow these steps:\n');

  console.log('1. Open http://localhost:1337/admin in your browser');
  console.log('2. Go to Settings → Users & Permissions Plugin → Roles');
  console.log('3. Click on "Public"');
  console.log('4. Look for "Store" in the permissions list');
  console.log('5. If Store is NOT visible:');
  console.log('   a. Go to Content Manager → Store');
  console.log('   b. Create a test store manually first');
  console.log('   c. Then return to permissions');
  console.log('6. Enable these Store permissions:');
  console.log('   ✅ find');
  console.log('   ✅ findOne');
  console.log('   ✅ create');
  console.log('7. Click Save');
  console.log('8. Run this script again: node scripts/direct-store-import.js\n');

  // Test if API is accessible
  const baseURL = 'http://localhost:1337/api';

  try {
    console.log('🧪 Testing API accessibility...');

    // Use Node.js built-in fetch if available (Node 18+)
    const fetch = globalThis.fetch || require('node-fetch');

    const response = await fetch(`${baseURL}/stores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(`API Response: ${response.status} ${response.statusText}`);

    if (response.status === 404) {
      console.log('❌ Store API not accessible - permissions not configured');
      console.log('   Please follow the steps above to configure permissions.');
      return;
    }

    if (response.status === 200) {
      const data = await response.json();
      console.log(`✅ Store API accessible! Found ${data.data.length} existing stores`);

      // Try to create a test store
      console.log('\n📝 Testing store creation...');

      const createResponse = await fetch(`${baseURL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: stores[0]
        })
      });

      if (createResponse.ok) {
        const result = await createResponse.json();
        console.log(`✅ Successfully created test store: ${result.data.name}`);
        console.log(`📍 Store ID: ${result.data.id}`);
        console.log('\n🎉 Permissions are working! You can now run the full import.');
      } else {
        const errorText = await createResponse.text();
        console.log(`❌ Failed to create store: ${createResponse.status}`);
        console.log(`   Error: ${errorText}`);
      }
    }

  } catch (error) {
    console.log(`❌ Connection error: ${error.message}`);
    console.log('   Make sure Strapi is running on http://localhost:1337');
  }
}

importStoresDirectly().catch(console.error);