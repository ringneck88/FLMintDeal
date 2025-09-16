/**
 * Direct Import Script - Runs independently of Strapi
 * Uses HTTP requests to populate data via REST API
 */

const storeData = require('./import-mint-stores.js');

async function createData() {
  const BASE_URL = 'http://localhost:1337/api';

  // We'll try to use the public API endpoints
  console.log('🌱 Starting direct import to Strapi...\n');

  try {
    // First, let's check what endpoints are available
    console.log('Checking API availability...');

    const endpoints = [
      '/brands',
      '/regions',
      '/cities',
      '/stores'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        console.log(`${endpoint}: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.log(`${endpoint}: Connection error`);
      }
    }

    console.log('\nIf you see 404 errors above, the API endpoints need to be configured in Strapi admin.');
    console.log('Please:');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Navigate to Settings > Users & Permissions Plugin > Roles > Public');
    console.log('3. Enable permissions for Brand, Region, City, and Store content types');
    console.log('4. Enable create, read permissions for each');
    console.log('5. Save and try this script again');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Helper function to create data once permissions are set
async function importWithPermissions() {
  const BASE_URL = 'http://localhost:1337/api';

  try {
    // Create Brand
    console.log('Creating Mint Cannabis brand...');
    const brandResponse = await fetch(`${BASE_URL}/brands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: storeData.brand
      })
    });

    if (!brandResponse.ok) {
      throw new Error(`Brand creation failed: ${brandResponse.status}`);
    }

    const brand = await brandResponse.json();
    console.log(`✓ Created brand: ${brand.data.attributes.name}`);

    // Create Regions
    console.log('\nCreating regions...');
    const regionIds = {};
    for (const region of storeData.regions) {
      const response = await fetch(`${BASE_URL}/regions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: region
        })
      });

      if (!response.ok) {
        throw new Error(`Region creation failed: ${response.status}`);
      }

      const result = await response.json();
      regionIds[region.name] = result.data.id;
      console.log(`✓ Created region: ${result.data.attributes.name} (${result.data.attributes.state_code})`);
    }

    // Create Cities
    console.log('\nCreating cities...');
    const cityIds = {};
    for (const city of storeData.cities) {
      const regionId = regionIds[city.region];
      const cityData = {
        name: city.name,
        slug: city.slug,
        region: regionId
      };

      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: cityData
        })
      });

      if (!response.ok) {
        throw new Error(`City creation failed: ${response.status}`);
      }

      const result = await response.json();
      cityIds[city.name] = result.data.id;
      console.log(`✓ Created city: ${result.data.attributes.name}`);
    }

    // Create Stores
    console.log('\nCreating stores...');
    for (const store of storeData.stores) {
      const regionId = regionIds[store.region];
      const cityId = cityIds[store.city];

      const storeDataForAPI = {
        name: store.name,
        slug: store.slug,
        store_code: store.store_code,
        brand: brand.data.id,
        region: regionId,
        city: cityId,
        address: store.address,
        geo: store.geo,
        phone: store.phone,
        email: store.email,
        timezone: store.timezone,
        hours: store.hours,
        services: store.services,
        amenities: store.amenities,
        is_active: store.is_active,
        menu_url: store.menu_url,
        online_ordering_url: store.online_ordering_url
      };

      const response = await fetch(`${BASE_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: storeDataForAPI
        })
      });

      if (!response.ok) {
        throw new Error(`Store creation failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✓ Created store: ${result.data.attributes.name}`);
      console.log(`   Address: ${store.address.street}, ${store.address.city}, ${store.address.state}`);
    }

    console.log('\n🎉 Import completed successfully!');
    console.log(`✓ 1 Brand created`);
    console.log(`✓ ${storeData.regions.length} Regions created`);
    console.log(`✓ ${storeData.cities.length} Cities created`);
    console.log(`✓ ${storeData.stores.length} Stores created`);

  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

// Check if we should run the import or just check permissions
const args = process.argv.slice(2);
if (args.includes('--import')) {
  importWithPermissions();
} else {
  createData();
}

module.exports = { createData, importWithPermissions };