/**
 * Add Stores Only - Simple script to add just the store locations
 * Since brand, regions, and cities are already imported
 */

const storeData = require('./import-mint-stores.js');

async function addStoresOnly() {
  const BASE_URL = 'http://localhost:1337/api';

  try {
    console.log('🏪 Adding Mint Cannabis store locations...\n');

    // Get existing brand
    const brandResponse = await fetch(`${BASE_URL}/brands`);
    const brands = await brandResponse.json();
    const mintBrand = brands.data.find(b => b.name === 'Mint Cannabis');
    if (!mintBrand) {
      throw new Error('Mint Cannabis brand not found!');
    }
    console.log(`✓ Found brand: ${mintBrand.name} (ID: ${mintBrand.id})`);

    // Get existing regions
    const regionsResponse = await fetch(`${BASE_URL}/regions`);
    const regions = await regionsResponse.json();
    const regionMap = {};
    regions.data.forEach(r => {
      regionMap[r.name] = r.id;
    });
    console.log(`✓ Found ${regions.data.length} regions`);

    // Get existing cities
    const citiesResponse = await fetch(`${BASE_URL}/cities`);
    const cities = await citiesResponse.json();
    const cityMap = {};
    cities.data.forEach(c => {
      cityMap[c.name] = c.id;
    });
    console.log(`✓ Found ${cities.data.length} cities\n`);

    // Add each store
    for (const [index, store] of storeData.stores.entries()) {
      const regionId = regionMap[store.region];
      const cityId = cityMap[store.city];

      const storePayload = {
        data: {
          name: store.name,
          slug: store.slug,
          store_code: store.store_code,
          brand: mintBrand.id,
          region: regionId,
          city: cityId,
          phone: store.phone,
          email: store.email,
          timezone: store.timezone,
          is_active: store.is_active,
          menu_url: store.menu_url,
          online_ordering_url: store.online_ordering_url,
          address: store.address,
          geo: store.geo,
          hours: store.hours,
          services: store.services,
          amenities: store.amenities
        }
      };

      const response = await fetch(`${BASE_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storePayload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✓ Store ${index + 1}: ${store.name}`);
        console.log(`   Address: ${store.address.street}, ${store.address.city}, ${store.address.state}`);
        console.log(`   Phone: ${store.phone}\n`);
      } else {
        const error = await response.text();
        console.log(`❌ Failed to create ${store.name}: ${response.status} ${error}\n`);
      }
    }

    console.log('🎉 Store import completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure to:');
    console.log('1. Enable API permissions in Strapi admin');
    console.log('2. Go to Settings > Users & Permissions > Roles > Public');
    console.log('3. Enable find and create permissions for Store, Brand, Region, City');
  }
}

addStoresOnly();