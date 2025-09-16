/**
 * Strapi Data Seeding Script
 * Run with: npm run strapi script seed-data.js
 */

const storeData = require('./import-mint-stores.js');

module.exports = async ({ strapi }) => {
  console.log('🌱 Starting data seeding for Mint Cannabis stores...\n');

  try {
    // 1. Create Brand
    console.log('1. Creating Brand...');
    const brand = await strapi.entityService.create('api::brand.brand', {
      data: {
        ...storeData.brand,
        publishedAt: new Date(),
      },
    });
    console.log(`✓ Created brand: ${brand.name} (ID: ${brand.id})\n`);

    // 2. Create Regions
    console.log('2. Creating Regions...');
    const regionIds = {};
    for (const region of storeData.regions) {
      const result = await strapi.entityService.create('api::region.region', {
        data: {
          ...region,
          publishedAt: new Date(),
        },
      });
      regionIds[region.name] = result.id;
      console.log(`✓ Created region: ${result.name} (${result.state_code}) - ID: ${result.id}`);
    }
    console.log('');

    // 3. Create Cities
    console.log('3. Creating Cities...');
    const cityIds = {};
    for (const city of storeData.cities) {
      const regionId = regionIds[city.region];
      const cityData = {
        name: city.name,
        slug: city.slug,
        region: regionId,
        publishedAt: new Date(),
      };

      const result = await strapi.entityService.create('api::city.city', {
        data: cityData,
      });
      cityIds[city.name] = result.id;
      console.log(`✓ Created city: ${result.name} in region ${city.region} - ID: ${result.id}`);
    }
    console.log('');

    // 4. Create Stores
    console.log('4. Creating Stores...');
    for (const store of storeData.stores) {
      const regionId = regionIds[store.region];
      const cityId = cityIds[store.city];

      const storeDataForStrapi = {
        name: store.name,
        slug: store.slug,
        store_code: store.store_code,
        brand: brand.id,
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
        amenities: store.amenities,
        publishedAt: new Date(),
      };

      const result = await strapi.entityService.create('api::store.store', {
        data: storeDataForStrapi,
      });

      console.log(`✓ Created store: ${result.name} - ID: ${result.id}`);
      console.log(`   Address: ${store.address.street}, ${store.address.city}, ${store.address.state}`);
      console.log(`   Phone: ${store.phone}`);
      console.log('');
    }

    console.log('🎉 Data seeding completed successfully!');
    console.log('========================================');
    console.log('Summary:');
    console.log(`✓ 1 Brand created (${brand.name})`);
    console.log(`✓ ${storeData.regions.length} Regions created`);
    console.log(`✓ ${storeData.cities.length} Cities created`);
    console.log(`✓ ${storeData.stores.length} Stores created`);
    console.log('');
    console.log('You can now access the admin panel to view the imported data:');
    console.log('http://localhost:1337/admin');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.error('Error details:', error.message);
  }
};