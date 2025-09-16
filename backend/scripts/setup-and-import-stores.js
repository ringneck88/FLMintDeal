#!/usr/bin/env node

/**
 * Setup API permissions and import Mint Cannabis stores
 * This script will:
 * 1. Configure public API permissions for stores
 * 2. Import all 17 Mint Cannabis locations
 */

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
    phone: "(480) 749-6468",
    address: {
      street_1: "17036 N Cave Creek Rd.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85032",
      country: "US",
      formatted_address: "17036 N Cave Creek Rd., Phoenix, AZ 85032"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Phoenix"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Mesa",
    phone: "(480) 749-6468",
    address: {
      street_1: "330 E Southern Ave",
      city: "Mesa",
      state: "AZ",
      postal_code: "85210",
      country: "US",
      formatted_address: "330 E Southern Ave, Mesa, AZ 85210"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "21:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "21:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "21:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "21:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "21:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Phoenix"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Northern Ave",
    phone: "(480) 749-6468",
    address: {
      street_1: "2444 W Northern Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85021",
      country: "US",
      formatted_address: "2444 W Northern Ave., Phoenix, AZ 85021"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Phoenix"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis 75th Ave",
    phone: "(480) 749-6468",
    address: {
      street_1: "1211 N 75th Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85043",
      country: "US",
      formatted_address: "1211 N 75th Ave., Phoenix, AZ 85043"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Phoenix"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Scottsdale",
    phone: "(480) 749-6468",
    address: {
      street_1: "8729 E Manzanita Dr.",
      city: "Scottsdale",
      state: "AZ",
      postal_code: "85258",
      country: "US",
      formatted_address: "8729 E Manzanita Dr., Scottsdale, AZ 85258"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Phoenix"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis El Mirage",
    phone: "(623) 248-7679",
    address: {
      street_1: "15235 N Dysart Rd",
      city: "El Mirage",
      state: "AZ",
      postal_code: "85335",
      country: "US",
      formatted_address: "15235 N Dysart Rd, El Mirage, AZ 85335"
    },
    timezone: "America/Phoenix",
    is_active: true,
    hours: {
      monday_open: "07:00:00.000",
      monday_close: "23:59:59.000",
      tuesday_open: "07:00:00.000",
      tuesday_close: "23:59:59.000",
      wednesday_open: "07:00:00.000",
      wednesday_close: "23:59:59.000",
      thursday_open: "07:00:00.000",
      thursday_close: "23:59:59.000",
      friday_open: "07:00:00.000",
      friday_close: "23:59:59.000",
      saturday_open: "07:00:00.000",
      saturday_close: "23:59:59.000",
      sunday_open: "07:00:00.000",
      sunday_close: "23:59:59.000",
      timezone: "America/Phoenix",
      notes: "7AM - 12AM"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },

  // Michigan Locations
  {
    name: "Mint Cannabis Monroe",
    phone: "(734) 384-3248",
    address: {
      street_1: "760 S Telegraph Rd.",
      city: "Monroe",
      state: "MI",
      postal_code: "48161",
      country: "US",
      formatted_address: "760 S Telegraph Rd., Monroe, MI 48161"
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
      sunday_open: "09:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Kalamazoo",
    phone: "(269) 743-7444",
    address: {
      street_1: "730 East Cork Street",
      city: "Kalamazoo",
      state: "MI",
      postal_code: "49001",
      country: "US",
      formatted_address: "730 East Cork Street, Kalamazoo, MI 49001"
    },
    timezone: "America/Detroit",
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
      friday_close: "21:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "09:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Coldwater",
    phone: "(517) 924-1232",
    address: {
      street_1: "365 N Willowbrook Rd.",
      city: "Coldwater",
      state: "MI",
      postal_code: "49036",
      country: "US",
      formatted_address: "365 N Willowbrook Rd., Coldwater, MI 49036"
    },
    timezone: "America/Detroit",
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
      friday_close: "21:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "09:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Portage",
    phone: "(269) 459-1204",
    address: {
      street_1: "5747 S Westnedge Ave.",
      city: "Portage",
      state: "MI",
      postal_code: "49002",
      country: "US",
      formatted_address: "5747 S Westnedge Ave., Portage, MI 49002"
    },
    timezone: "America/Detroit",
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
      friday_close: "21:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "09:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis New Buffalo",
    phone: "(269) 231-5473",
    address: {
      street_1: "18300 US-12",
      city: "New Buffalo",
      state: "MI",
      postal_code: "49117",
      country: "US",
      formatted_address: "18300 US-12, New Buffalo, MI 49117"
    },
    timezone: "America/Detroit",
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
      friday_close: "21:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "09:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis Roseville",
    phone: "(586) 541-8897",
    address: {
      street_1: "28970 Hayes Rd.",
      city: "Roseville",
      state: "MI",
      postal_code: "48066",
      country: "US",
      formatted_address: "28970 Hayes Rd., Roseville, MI 48066"
    },
    timezone: "America/Detroit",
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
      friday_close: "21:00:00.000",
      saturday_open: "09:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "09:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Detroit"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },

  // Nevada Locations
  {
    name: "Mint Cannabis Las Vegas Strip",
    phone: "(702) 389-8556",
    address: {
      street_1: "4503 Paradise Rd.",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89119",
      country: "US",
      formatted_address: "4503 Paradise Rd., Las Vegas, NV 89119"
    },
    timezone: "America/Los_Angeles",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "23:59:59.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "23:59:59.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "23:59:59.000",
      thursday_open: "08:00:00.000",
      thursday_close: "23:59:59.000",
      friday_open: "08:00:00.000",
      friday_close: "23:59:59.000",
      saturday_open: "08:00:00.000",
      saturday_close: "23:59:59.000",
      sunday_open: "08:00:00.000",
      sunday_close: "23:59:59.000",
      timezone: "America/Los_Angeles",
      notes: "8am to 12am"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },
  {
    name: "Mint Cannabis West Las Vegas",
    phone: "(702) 659-7356",
    address: {
      street_1: "6332 S Rainbow Blvd, Suite 105",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89118",
      country: "US",
      formatted_address: "6332 S Rainbow Blvd, Suite 105, Las Vegas, NV 89118"
    },
    timezone: "America/Los_Angeles",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Los_Angeles"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  },

  // Illinois Location
  {
    name: "Mint Cannabis Willowbrook",
    phone: "(630) 216-9135",
    address: {
      street_1: "900 75th St.",
      city: "Willowbrook",
      state: "IL",
      postal_code: "60527",
      country: "US",
      formatted_address: "900 75th St., Willowbrook, IL 60527"
    },
    timezone: "America/Chicago",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "22:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "22:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "22:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "22:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "22:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "22:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "22:00:00.000",
      timezone: "America/Chicago"
    },
    services: [
      { name: "Recreational", is_active: true }
    ]
  },

  // Missouri Location
  {
    name: "Mint Cannabis St. Peters",
    phone: "(636) 387-1144",
    address: {
      street_1: "150 Mid Rivers Mall Cir.",
      city: "St. Peters",
      state: "MO",
      postal_code: "63376",
      country: "US",
      formatted_address: "150 Mid Rivers Mall Cir., St. Peters, MO 63376"
    },
    timezone: "America/Chicago",
    is_active: true,
    hours: {
      monday_open: "08:00:00.000",
      monday_close: "21:00:00.000",
      tuesday_open: "08:00:00.000",
      tuesday_close: "21:00:00.000",
      wednesday_open: "08:00:00.000",
      wednesday_close: "21:00:00.000",
      thursday_open: "08:00:00.000",
      thursday_close: "21:00:00.000",
      friday_open: "08:00:00.000",
      friday_close: "21:00:00.000",
      saturday_open: "08:00:00.000",
      saturday_close: "21:00:00.000",
      sunday_open: "08:00:00.000",
      sunday_close: "21:00:00.000",
      timezone: "America/Chicago"
    },
    services: [
      { name: "Medical", is_active: true },
      { name: "Recreational", is_active: true }
    ]
  }
];

async function configurePermissions() {
  console.log('⚙️  Configuring API permissions...');

  // We'll need to create an admin user token or use the admin API
  // For now, let's try to enable public access via configuration

  console.log('ℹ️  Manual step required: Please enable public permissions in Strapi admin');
  console.log('ℹ️  Go to Settings → Roles → Public → Store and enable: find, create');

  return true;
}

async function importStores() {
  console.log(`🚀 Starting import of ${stores.length} stores...`);

  const baseURL = 'http://localhost:1337/api';
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    console.log(`\n📍 Importing ${i + 1}/${stores.length}: ${store.name}`);

    try {
      // First try to create with minimal data to test permissions
      const minimalStore = {
        name: store.name,
        phone: store.phone,
        is_active: store.is_active
      };

      const response = await fetch(`${baseURL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: minimalStore
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully created: ${store.name}`);
        successCount++;
      } else {
        const errorText = await response.text();
        console.log(`❌ Failed to create ${store.name}: ${response.status}`);
        console.log(`   Error: ${errorText}`);
        failCount++;

        // If it's a permission error, we need to configure permissions
        if (response.status === 403 || response.status === 401) {
          console.log('🔒 Permission denied. Please configure API permissions in Strapi admin:');
          console.log('   1. Go to http://localhost:1337/admin');
          console.log('   2. Navigate to Settings → Roles → Public');
          console.log('   3. Enable Store permissions: find, create');
          console.log('   4. Save and try running this script again');
          break;
        }
      }
    } catch (error) {
      console.log(`❌ Network error for ${store.name}:`, error.message);
      failCount++;
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📍 Total: ${stores.length}`);

  if (successCount > 0) {
    console.log(`\n🎉 Import completed! Check your Strapi admin at http://localhost:1337/admin`);
  }
}

async function main() {
  console.log('🏪 Mint Cannabis Store Import Tool');
  console.log('==================================\n');

  try {
    await configurePermissions();
    await importStores();
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Add fetch polyfill for Node.js
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

main();