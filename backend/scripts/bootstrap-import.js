/**
 * Bootstrap Import Script
 * This runs when Strapi starts up to automatically import data
 */

const storeData = require('./import-mint-stores.js');

module.exports = async () => {
  console.log('🌱 Bootstrap: Checking for existing data...');

  try {
    // Clean up any partial data first
    console.log('🧹 Cleaning up any partial import data...');

    try {
      // Delete stores first (they depend on cities/regions/brands)
      const stores = await strapi.entityService.findMany('api::store.store');
      for (const store of stores) {
        await strapi.entityService.delete('api::store.store', store.id);
      }
      console.log('✓ Cleaned up existing stores');

      // Delete cities
      const cities = await strapi.entityService.findMany('api::city.city');
      for (const city of cities) {
        await strapi.entityService.delete('api::city.city', city.id);
      }
      console.log('✓ Cleaned up existing cities');

      // Delete regions
      const regions = await strapi.entityService.findMany('api::region.region');
      for (const region of regions) {
        await strapi.entityService.delete('api::region.region', region.id);
      }
      console.log('✓ Cleaned up existing regions');

      // Delete brands
      const brands = await strapi.entityService.findMany('api::brand.brand');
      for (const brand of brands) {
        await strapi.entityService.delete('api::brand.brand', brand.id);
      }
      console.log('✓ Cleaned up existing brands');
    } catch (cleanupError) {
      console.log('ℹ️ Cleanup completed (some items may not have existed)');
    }

    console.log('🌱 Importing Mint Cannabis store data...');

    // Create Brand
    const brand = await strapi.entityService.create('api::brand.brand', {
      data: {
        ...storeData.brand,
        publishedAt: new Date(),
      },
    });
    console.log(`✓ Created brand: ${brand.name}`);

    // Create Regions
    const regionIds = {};
    for (const region of storeData.regions) {
      const result = await strapi.entityService.create('api::region.region', {
        data: {
          ...region,
          publishedAt: new Date(),
        },
      });
      regionIds[region.name] = result.id;
      console.log(`✓ Created region: ${result.name} (${result.state_code})`);
    }

    // Create Cities
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
      console.log(`✓ Created city: ${result.name}`);
    }

    // Create Stores
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

      console.log(`✓ Created store: ${result.name}`);
    }

    console.log('🎉 Bootstrap import completed successfully!');
    console.log(`✓ 1 Brand created`);
    console.log(`✓ ${storeData.regions.length} Regions created`);
    console.log(`✓ ${storeData.cities.length} Cities created`);
    console.log(`✓ ${storeData.stores.length} Stores created`);

  } catch (error) {
    console.error('❌ Bootstrap import failed:', error);
  }
};