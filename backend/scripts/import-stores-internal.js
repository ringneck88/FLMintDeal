#!/usr/bin/env node

/**
 * Internal Store Import Script
 * Uses Strapi's internal service API to bypass permission restrictions
 */

const path = require('path');

// Set up Strapi environment
process.chdir(path.resolve(__dirname, '..'));

const stores = [
  // Arizona Locations
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
  },
  {
    name: "Mint Cannabis Phoenix",
    phone: "(602) 354-3344",
    address: {
      street_1: "314 W McDowell Rd.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85003",
      country: "US",
      formatted_address: "314 W McDowell Rd., Phoenix, AZ 85003"
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
      { name: "Delivery", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Mesa",
    phone: "(480) 590-3010",
    address: {
      street_1: "1235 S Power Rd.",
      city: "Mesa",
      state: "AZ",
      postal_code: "85206",
      country: "US",
      formatted_address: "1235 S Power Rd., Mesa, AZ 85206"
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
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Northern Ave",
    phone: "(602) 354-0420",
    address: {
      street_1: "7602 N 19th Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85021",
      country: "US",
      formatted_address: "7602 N 19th Ave., Phoenix, AZ 85021"
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
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis 75th Ave",
    phone: "(602) 354-0420",
    address: {
      street_1: "3215 W Glendale Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85051",
      country: "US",
      formatted_address: "3215 W Glendale Ave., Phoenix, AZ 85051"
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
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Scottsdale",
    phone: "(480) 590-3010",
    address: {
      street_1: "8420 E McDowell Rd.",
      city: "Scottsdale",
      state: "AZ",
      postal_code: "85257",
      country: "US",
      formatted_address: "8420 E McDowell Rd., Scottsdale, AZ 85257"
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
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis El Mirage",
    phone: "(623) 825-9650",
    address: {
      street_1: "13621 W Grand Ave.",
      city: "El Mirage",
      state: "AZ",
      postal_code: "85335",
      country: "US",
      formatted_address: "13621 W Grand Ave., El Mirage, AZ 85335"
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
      { name: "Recreational", is_active: true }
    ]
  },
  // Michigan Locations
  {
    name: "Mint Cannabis Monroe",
    phone: "(734) 255-6600",
    address: {
      street_1: "14923 S Dixie Hwy.",
      city: "Monroe",
      state: "MI",
      postal_code: "48161",
      country: "US",
      formatted_address: "14923 S Dixie Hwy., Monroe, MI 48161"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Kalamazoo",
    phone: "(269) 492-9333",
    address: {
      street_1: "3045 Stadium Dr.",
      city: "Kalamazoo",
      state: "MI",
      postal_code: "49008",
      country: "US",
      formatted_address: "3045 Stadium Dr., Kalamazoo, MI 49008"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Coldwater",
    phone: "(517) 279-2244",
    address: {
      street_1: "1035 E Chicago St.",
      city: "Coldwater",
      state: "MI",
      postal_code: "49036",
      country: "US",
      formatted_address: "1035 E Chicago St., Coldwater, MI 49036"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Portage",
    phone: "(269) 492-9333",
    address: {
      street_1: "7155 S Westnedge Ave.",
      city: "Portage",
      state: "MI",
      postal_code: "49002",
      country: "US",
      formatted_address: "7155 S Westnedge Ave., Portage, MI 49002"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis New Buffalo",
    phone: "(269) 469-4200",
    address: {
      street_1: "13988 Red Arrow Hwy.",
      city: "New Buffalo",
      state: "MI",
      postal_code: "49117",
      country: "US",
      formatted_address: "13988 Red Arrow Hwy., New Buffalo, MI 49117"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Roseville",
    phone: "(586) 775-4200",
    address: {
      street_1: "27849 Gratiot Ave.",
      city: "Roseville",
      state: "MI",
      postal_code: "48066",
      country: "US",
      formatted_address: "27849 Gratiot Ave., Roseville, MI 48066"
    },
    timezone: "America/Detroit",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit",
      notes: "Regular hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  // Nevada Locations
  {
    name: "Mint Cannabis Las Vegas Strip",
    phone: "(702) 463-6468",
    address: {
      street_1: "3650 S Decatur Blvd.",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89103",
      country: "US",
      formatted_address: "3650 S Decatur Blvd., Las Vegas, NV 89103"
    },
    timezone: "America/Los_Angeles",
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
      timezone: "America/Los_Angeles",
      notes: "Open 24 hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true },
      { name: "Delivery", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis West Las Vegas",
    phone: "(702) 463-6468",
    address: {
      street_1: "2621 W Sahara Ave.",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89102",
      country: "US",
      formatted_address: "2621 W Sahara Ave., Las Vegas, NV 89102"
    },
    timezone: "America/Los_Angeles",
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
      timezone: "America/Los_Angeles",
      notes: "Open 24 hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  // Illinois Location
  {
    name: "Mint Cannabis Willowbrook",
    phone: "(630) 655-2550",
    address: {
      street_1: "6440 S Route 83.",
      city: "Willowbrook",
      state: "IL",
      postal_code: "60527",
      country: "US",
      formatted_address: "6440 S Route 83., Willowbrook, IL 60527"
    },
    timezone: "America/Chicago",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "21:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "21:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "21:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "21:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "20:00:00.000",
      timezone: "America/Chicago",
      notes: "Extended weekend hours"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  // Missouri Location
  {
    name: "Mint Cannabis St. Peters",
    phone: "(636) 477-6468",
    address: {
      street_1: "3820 Mexico Rd.",
      city: "St. Peters",
      state: "MO",
      postal_code: "63376",
      country: "US",
      formatted_address: "3820 Mexico Rd., St. Peters, MO 63376"
    },
    timezone: "America/Chicago",
    is_active: true,
    hours: {
      monday_open: "09:00:00.000",
      monday_close: "21:00:00.000",
      tuesday_open: "09:00:00.000",
      tuesday_close: "21:00:00.000",
      wednesday_open: "09:00:00.000",
      wednesday_close: "21:00:00.000",
      thursday_open: "09:00:00.000",
      thursday_close: "21:00:00.000",
      friday_open: "09:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "10:00:00.000",
      sunday_close: "20:00:00.000",
      timezone: "America/Chicago",
      notes: "Extended weekend hours"
    },
    services: [
      { name: "Medical", is_active: true }
    ]
  }
];

async function importStores() {
  console.log('🏪 Mint Cannabis Store Import Tool (Internal API)');
  console.log('==================================================\n');

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  try {
    // Import Strapi instance
    const strapi = require('@strapi/strapi')({
      distDir: './dist',
      autoReload: false,
      serveAdminPanel: false
    });

    // Check if Strapi is already loaded
    if (!global.strapi) {
      throw new Error('Strapi is not running. Please start Strapi first with: npm run develop');
    }

    console.log('✅ Connected to Strapi instance');
    console.log(`🚀 Starting import of ${stores.length} stores...`);

    for (const store of stores) {
      console.log(`\n📍 Importing ${store.name}...`);

      try {
        // Check if store already exists
        const existingStores = await global.strapi.documents('api::store.store').findMany({
          filters: { name: store.name }
        });

        if (existingStores.length > 0) {
          console.log(`⏭️  Store ${store.name} already exists, skipping`);
          skippedCount++;
          continue;
        }

        // Create the store
        const result = await global.strapi.documents('api::store.store').create({
          data: store,
          status: 'published'
        });

        console.log(`✅ Successfully created: ${store.name} (ID: ${result.documentId})`);
        successCount++;

      } catch (error) {
        console.log(`❌ Failed to create ${store.name}:`);
        console.log(`   Error: ${error.message}`);
        failCount++;
      }
    }

    console.log(`\n📊 Import Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📍 Total: ${stores.length}`);

    if (successCount > 0) {
      console.log(`\n🎉 Import completed! Check your Strapi admin at http://localhost:1337/admin`);
      console.log(`📍 Navigate to Content Manager → Store to see the imported locations`);
    }

  } catch (error) {
    console.error('💥 Import failed:', error.message);

    if (error.message.includes('Strapi is not running')) {
      console.log('\n🔧 To fix this:');
      console.log('   1. Start Strapi: npm run develop');
      console.log('   2. Wait for it to fully load');
      console.log('   3. Run this script again');
    }

    process.exit(1);
  }
}

// Run the import
importStores();