// Script to properly recreate stores using Strapi's entity service
// This ensures they follow the correct Strapi v5 document format

async function fixStores() {
  console.log('🔧 Fixing stores to appear in Content Manager...\n');

  // Sample stores to recreate
  const stores = [
    {
      name: 'Green Relief Dispensary',
      slug: 'green-relief-dispensary',
      phone: '(305) 555-0123',
      email: 'info@greenrelief.com',
      is_active: true
    },
    {
      name: 'Sunshine Cannabis Co',
      slug: 'sunshine-cannabis-co',
      phone: '(813) 555-0456',
      email: 'hello@sunshinecannabisc.com',
      is_active: true
    },
    {
      name: 'Palm Tree Wellness',
      slug: 'palm-tree-wellness',
      phone: '(407) 555-0789',
      email: 'care@palmtreewellness.com',
      is_active: true
    }
  ];

  // First, delete the problematic imported stores
  console.log('Removing imported stores that are not visible...');
  const { execSync } = require('child_process');

  try {
    execSync('docker exec flmintdeal-postgres psql -U postgres -d flmintdeal_dev -c "DELETE FROM stores WHERE document_id LIKE \'store-%\';"', { encoding: 'utf8' });
    console.log('✅ Removed imported stores');
  } catch (error) {
    console.log('⚠️ Could not remove stores:', error.message);
  }

  console.log('\n📝 Instructions to manually recreate stores:');
  console.log('1. Go to http://localhost:1337/admin');
  console.log('2. Navigate to Content Manager > Store');
  console.log('3. Click "Create new entry" for each store:');
  console.log('');

  stores.forEach((store, index) => {
    console.log(`Store ${index + 1}:`);
    console.log(`  Name: ${store.name}`);
    console.log(`  Slug: ${store.slug}`);
    console.log(`  Phone: ${store.phone}`);
    console.log(`  Email: ${store.email}`);
    console.log(`  Is Active: ✅ (checked)`);
    console.log('  Click SAVE then PUBLISH');
    console.log('');
  });

  console.log('This will ensure they appear properly in the Content Manager!');
}

fixStores();