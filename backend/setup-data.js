// Run this with: npx strapi console
// Then type: exec(require('path').resolve('./setup-data.js'))

const fs = require('fs');
const path = require('path');

// Read sample data
const stores = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'sample-stores.json'), 'utf8'));
const brands = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'sample-brands.json'), 'utf8'));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'sample-cities.json'), 'utf8'));

const deals = [
  {
    title: "Happy Hour - 20% Off All Flower",
    description: "Get 20% off all premium flower strains during our daily happy hour from 4-6 PM.",
    discount_percentage: 20,
    deal_type: "percentage",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_active: true,
    terms: "Valid during happy hour only. Cannot be combined with other offers."
  },
  {
    title: "New Patient Special - $50 Off First Purchase",
    description: "Welcome new patients with $50 off their first purchase over $100.",
    discount_amount: 50,
    deal_type: "dollar_amount",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_active: true,
    terms: "Valid for new patients only. Minimum purchase $100 required."
  },
  {
    title: "Weekend Warriors - Buy 2 Get 1 Free Edibles",
    description: "Stock up on edibles with our weekend BOGO deal on all gummy products.",
    deal_type: "buy_one_get_one",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_active: true,
    terms: "Valid weekends only. Equal or lesser value item free."
  }
];

async function setupPermissionsAndData() {
  console.log('🚀 Setting up permissions and adding sample data...\n');

  try {
    // Setup permissions for public role
    console.log('📋 Configuring public role permissions...');

    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    if (publicRole) {
      console.log(`✅ Found public role (ID: ${publicRole.id})`);

      // Content types to enable
      const contentTypes = ['store', 'brand', 'city', 'deal'];
      const permissions = ['find', 'findOne', 'create'];

      for (const contentType of contentTypes) {
        for (const permission of permissions) {
          try {
            await strapi.query('plugin::users-permissions.permission').updateMany({
              where: {
                role: publicRole.id,
                action: `api::${contentType}.${contentType}.${permission}`
              },
              data: { enabled: true }
            });
            console.log(`  ✅ Enabled ${contentType}.${permission}`);
          } catch (error) {
            // Try alternative format
            try {
              await strapi.query('plugin::users-permissions.permission').updateMany({
                where: {
                  role: publicRole.id,
                  action: `application::${contentType}.${contentType}.${permission}`
                },
                data: { enabled: true }
              });
              console.log(`  ✅ Enabled ${contentType}.${permission} (alt format)`);
            } catch (altError) {
              console.log(`  ⚠️  Could not enable ${contentType}.${permission}`);
            }
          }
        }
      }
    }

    // Add sample data
    console.log('\n📦 Adding sample data...\n');

    // Add stores
    console.log('Adding stores...');
    for (let i = 0; i < Math.min(stores.length, 3); i++) {
      const store = stores[i];
      try {
        const created = await strapi.entityService.create('api::store.store', {
          data: store
        });
        console.log(`  ✅ Created store: ${store.name} (ID: ${created.id})`);
      } catch (error) {
        console.log(`  ❌ Failed to create store: ${store.name} - ${error.message}`);
      }
    }

    // Add brands
    console.log('\nAdding brands...');
    for (let i = 0; i < Math.min(brands.length, 3); i++) {
      const brand = brands[i];
      try {
        const created = await strapi.entityService.create('api::brand.brand', {
          data: brand
        });
        console.log(`  ✅ Created brand: ${brand.name} (ID: ${created.id})`);
      } catch (error) {
        console.log(`  ❌ Failed to create brand: ${brand.name} - ${error.message}`);
      }
    }

    // Add cities
    console.log('\nAdding cities...');
    for (let i = 0; i < Math.min(cities.length, 3); i++) {
      const city = cities[i];
      try {
        const created = await strapi.entityService.create('api::city.city', {
          data: city
        });
        console.log(`  ✅ Created city: ${city.name} (ID: ${created.id})`);
      } catch (error) {
        console.log(`  ❌ Failed to create city: ${city.name} - ${error.message}`);
      }
    }

    // Add deals
    console.log('\nAdding deals...');
    for (const deal of deals) {
      try {
        const created = await strapi.entityService.create('api::deal.deal', {
          data: deal
        });
        console.log(`  ✅ Created deal: ${deal.title} (ID: ${created.id})`);
      } catch (error) {
        console.log(`  ❌ Failed to create deal: ${deal.title} - ${error.message}`);
      }
    }

    console.log('\n🎉 Setup complete!');
    console.log('\n🔗 Test your API endpoints:');
    console.log('   GET http://localhost:1337/api/stores');
    console.log('   GET http://localhost:1337/api/brands');
    console.log('   GET http://localhost:1337/api/cities');
    console.log('   GET http://localhost:1337/api/deals');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Export for console use
module.exports = setupPermissionsAndData;

// If run directly, execute
if (require.main === module) {
  setupPermissionsAndData();
}