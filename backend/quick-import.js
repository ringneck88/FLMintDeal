#!/usr/bin/env node

/**
 * Quick Store Import - Display stores in an easy-to-copy format
 */

const fs = require('fs');
const path = require('path');

console.log('🏪 Quick Store Import Helper');
console.log('============================\n');

try {
  // Read the JSON file
  const storesPath = path.join(__dirname, 'data', 'stores-for-import.json');
  const storesData = JSON.parse(fs.readFileSync(storesPath, 'utf8'));

  console.log(`📊 Found ${storesData.length} stores ready for import\n`);

  console.log('💡 Import Methods Available:\n');

  console.log('🔧 Method 1: Copy-Paste Individual Stores');
  console.log('   1. Open: http://localhost:1337/admin');
  console.log('   2. Go to: Content Manager → Store → Create new entry');
  console.log('   3. Copy the JSON data below for each store\n');

  storesData.forEach((store, index) => {
    console.log(`📍 Store ${index + 1}: ${store.name}`);
    console.log('   Copy this JSON:');
    console.log('   ' + JSON.stringify(store, null, 2).split('\n').join('\n   '));
    console.log('');
  });

  console.log('🔧 Method 2: View Complete JSON File');
  console.log(`   File location: ${storesPath}`);
  console.log('   Open this file and copy individual store objects\n');

  console.log('🔧 Method 3: One-by-One Fields');
  console.log('   For manual entry, here are the key fields:\n');

  storesData.forEach((store, index) => {
    console.log(`📍 Store ${index + 1}: ${store.name}`);
    console.log(`   Name: ${store.name}`);
    console.log(`   Slug: ${store.slug}`);
    console.log(`   Phone: ${store.phone}`);
    console.log(`   Street: ${store.address.street_1}`);
    console.log(`   City: ${store.address.city}`);
    console.log(`   State: ${store.address.state}`);
    console.log(`   Zip: ${store.address.postal_code}`);
    console.log(`   Timezone: ${store.timezone}`);
    console.log(`   Active: ${store.is_active}`);
    console.log('');
  });

} catch (error) {
  console.error('❌ Error reading store data:', error.message);
  console.log('\n💡 Make sure you are in the backend directory');
  console.log('   Run: cd backend && node quick-import.js');
}

console.log('🎯 Next Steps:');
console.log('   1. Choose a method above');
console.log('   2. Import stores into Strapi admin');
console.log('   3. Stores will then be manageable through the CMS');
console.log('   4. You can update the frontend to fetch from Strapi instead of using fallback data\n');