/**
 * Strapi Data Import Script
 * Imports Mint Cannabis store data into Strapi CMS
 */

const storeData = require('./import-mint-stores.js');

async function importData() {
  const STRAPI_URL = 'http://localhost:1337';

  // Helper function to make authenticated requests
  async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${STRAPI_URL}/api${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error making request to ${endpoint}:`, error.message);
      throw error;
    }
  }

  try {
    console.log('Starting Mint Cannabis data import...\n');

    // 1. Create Brand
    console.log('1. Creating Brand...');
    const brand = await apiRequest('/brands', 'POST', { data: storeData.brand });
    console.log(`✓ Created brand: ${storeData.brand.name}\n`);

    // 2. Create Regions
    console.log('2. Creating Regions...');
    const regionIds = {};
    for (const region of storeData.regions) {
      const result = await apiRequest('/regions', 'POST', { data: region });
      regionIds[region.name] = result.data.id;
      console.log(`✓ Created region: ${region.name} (${region.state_code})`);
    }
    console.log('');

    // 3. Create Cities
    console.log('3. Creating Cities...');
    const cityIds = {};
    for (const city of storeData.cities) {
      const regionId = regionIds[city.region];
      const cityData = {
        ...city,
        region: regionId
      };
      delete cityData.region; // Remove string reference, use ID

      const result = await apiRequest('/cities', 'POST', { data: cityData });
      cityIds[city.name] = result.data.id;
      console.log(`✓ Created city: ${city.name} in ${city.region}`);
    }
    console.log('');

    // 4. Create Stores
    console.log('4. Creating Stores...');
    for (const store of storeData.stores) {
      const regionId = regionIds[store.region];
      const cityId = cityIds[store.city];

      const storeData = {
        ...store,
        brand: brand.data.id,
        region: regionId,
        city: cityId
      };

      const result = await apiRequest('/stores', 'POST', { data: storeData });
      console.log(`✓ Created store: ${store.name}`);
      console.log(`   Address: ${store.address.street}, ${store.address.city}, ${store.address.state}`);
      console.log(`   Phone: ${store.phone}`);
    }
    console.log('');

    console.log('🎉 Import completed successfully!');
    console.log('Summary:');
    console.log(`- 1 Brand created`);
    console.log(`- ${storeData.regions.length} Regions created`);
    console.log(`- ${storeData.cities.length} Cities created`);
    console.log(`- ${storeData.stores.length} Stores created`);

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    console.error('Make sure Strapi is running and API permissions are configured.');
  }
}

// Check if running as main script
if (require.main === module) {
  importData();
}

module.exports = { importData, storeData };