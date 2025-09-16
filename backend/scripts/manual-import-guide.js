/**
 * Manual Import Guide for Mint Cannabis Store Data
 * Copy-paste this data into Strapi Admin Panel
 */

const storeData = require('./import-mint-stores.js');

console.log('📋 MANUAL IMPORT GUIDE FOR STRAPI ADMIN PANEL');
console.log('==============================================\n');

console.log('🌐 Admin Panel URL: http://localhost:1337/admin');
console.log('🔑 Login: admin@test.com / Admin123456\n');

console.log('📝 IMPORT ORDER (follow this sequence):');
console.log('1. Create Brand first');
console.log('2. Create Regions');
console.log('3. Create Cities (link to regions)');
console.log('4. Create Stores (link to brand, region, city)\n');

// Brand Data
console.log('1️⃣ CREATE BRAND');
console.log('==============');
console.log('Go to: Content Manager > Brand > Create new entry\n');
console.log('Brand Data:');
console.log(`Name: ${storeData.brand.name}`);
console.log(`Slug: ${storeData.brand.slug}`);
console.log(`Description: ${storeData.brand.description}`);
console.log(`Website: ${storeData.brand.website}`);
console.log(`Phone: ${storeData.brand.phone}`);
console.log(`Is Active: ${storeData.brand.is_active}`);
console.log('✅ Save and Publish\n');

// Regions Data
console.log('2️⃣ CREATE REGIONS');
console.log('================');
console.log('Go to: Content Manager > Region > Create new entry\n');

storeData.regions.forEach((region, index) => {
  console.log(`Region ${index + 1}: ${region.name}`);
  console.log(`Name: ${region.name}`);
  console.log(`Slug: ${region.slug}`);
  console.log(`State Code: ${region.state_code}`);
  console.log(`Country: ${region.country}`);
  console.log(`Tax Rate: ${region.tax_rate}`);
  console.log(`Is Active: ${region.is_active}`);
  console.log('✅ Save and Publish\n');
});

// Cities Data
console.log('3️⃣ CREATE CITIES');
console.log('===============');
console.log('Go to: Content Manager > City > Create new entry\n');

storeData.cities.forEach((city, index) => {
  console.log(`City ${index + 1}: ${city.name}`);
  console.log(`Name: ${city.name}`);
  console.log(`Slug: ${city.slug}`);
  console.log(`Region: Select "${city.region}" from dropdown`);
  console.log('✅ Save and Publish\n');
});

// Stores Data
console.log('4️⃣ CREATE STORES');
console.log('===============');
console.log('Go to: Content Manager > Store > Create new entry\n');

storeData.stores.forEach((store, index) => {
  console.log(`STORE ${index + 1}: ${store.name}`);
  console.log('=====================================');
  console.log(`Name: ${store.name}`);
  console.log(`Slug: ${store.slug}`);
  console.log(`Store Code: ${store.store_code}`);
  console.log(`Brand: Select "Mint Cannabis" from dropdown`);
  console.log(`Region: Select "${store.region}" from dropdown`);
  console.log(`City: Select "${store.city}" from dropdown`);
  console.log(`Phone: ${store.phone}`);
  console.log(`Email: ${store.email || 'Leave empty'}`);
  console.log(`Timezone: ${store.timezone}`);
  console.log(`Is Active: ${store.is_active}`);
  console.log(`Menu URL: ${store.menu_url}`);
  console.log(`Online Ordering URL: ${store.online_ordering_url}`);
  console.log('');

  console.log('📍 ADDRESS COMPONENT:');
  console.log(`Street: ${store.address.street}`);
  console.log(`City: ${store.address.city}`);
  console.log(`State: ${store.address.state}`);
  console.log(`Zip Code: ${store.address.zip_code}`);
  console.log(`Country: ${store.address.country}`);
  console.log('');

  console.log('🌍 GEO COMPONENT:');
  console.log(`Latitude: ${store.geo.latitude}`);
  console.log(`Longitude: ${store.geo.longitude}`);
  console.log('');

  console.log('🕒 HOURS COMPONENT:');
  Object.entries(store.hours).forEach(([day, hours]) => {
    console.log(`${day}: ${hours.open} - ${hours.close} (Closed: ${hours.is_closed})`);
  });
  console.log('');

  console.log('🔧 SERVICES:');
  store.services.forEach(service => {
    console.log(`- ${service.name}: ${service.is_available}`);
  });
  console.log('');

  console.log('🎁 AMENITIES:');
  store.amenities.forEach(amenity => {
    console.log(`- ${amenity.name}: ${amenity.description}`);
  });
  console.log('');

  console.log('✅ Save and Publish');
  console.log('=====================================\n');
});

console.log('🎉 IMPORT COMPLETE!');
console.log('After importing all data, you will have:');
console.log(`✓ 1 Brand (${storeData.brand.name})`);
console.log(`✓ ${storeData.regions.length} Regions`);
console.log(`✓ ${storeData.cities.length} Cities`);
console.log(`✓ ${storeData.stores.length} Store Locations`);
console.log('');
console.log('🔗 Access your data at: http://localhost:1337/admin');