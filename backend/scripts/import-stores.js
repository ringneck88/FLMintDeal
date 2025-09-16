#!/usr/bin/env node

/**
 * Script to import Mint Cannabis store locations into Strapi
 * Run from backend directory with: node scripts/import-stores.js
 */

const stores = [
  // Arizona Locations
  {
    name: "Mint Cannabis Tempe",
    address: {
      street_1: "5210 S Priest Dr.",
      city: "Tempe",
      state: "AZ",
      postal_code: "85283",
      country: "US",
      formatted_address: "5210 S Priest Dr., Tempe, AZ 85283"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis Phoenix",
    address: {
      street_1: "17036 N Cave Creek Rd.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85032",
      country: "US",
      formatted_address: "17036 N Cave Creek Rd., Phoenix, AZ 85032"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis Mesa",
    address: {
      street_1: "330 E Southern Ave",
      city: "Mesa",
      state: "AZ",
      postal_code: "85210",
      country: "US",
      formatted_address: "330 E Southern Ave, Mesa, AZ 85210"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis Northern Ave",
    address: {
      street_1: "2444 W Northern Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85021",
      country: "US",
      formatted_address: "2444 W Northern Ave., Phoenix, AZ 85021"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis 75th Ave",
    address: {
      street_1: "1211 N 75th Ave.",
      city: "Phoenix",
      state: "AZ",
      postal_code: "85043",
      country: "US",
      formatted_address: "1211 N 75th Ave., Phoenix, AZ 85043"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis Scottsdale",
    address: {
      street_1: "8729 E Manzanita Dr.",
      city: "Scottsdale",
      state: "AZ",
      postal_code: "85258",
      country: "US",
      formatted_address: "8729 E Manzanita Dr., Scottsdale, AZ 85258"
    },
    phone: "(480) 749-6468",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },
  {
    name: "Mint Cannabis El Mirage",
    address: {
      street_1: "15235 N Dysart Rd",
      city: "El Mirage",
      state: "AZ",
      postal_code: "85335",
      country: "US",
      formatted_address: "15235 N Dysart Rd, El Mirage, AZ 85335"
    },
    phone: "(623) 248-7679",
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
    ],
    timezone: "America/Phoenix",
    is_active: true
  },

  // Michigan Locations
  {
    name: "Mint Cannabis Monroe",
    address: {
      street_1: "760 S Telegraph Rd.",
      city: "Monroe",
      state: "MI",
      postal_code: "48161",
      country: "US",
      formatted_address: "760 S Telegraph Rd., Monroe, MI 48161"
    },
    phone: "(734) 384-3248",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },
  {
    name: "Mint Cannabis Kalamazoo",
    address: {
      street_1: "730 East Cork Street",
      city: "Kalamazoo",
      state: "MI",
      postal_code: "49001",
      country: "US",
      formatted_address: "730 East Cork Street, Kalamazoo, MI 49001"
    },
    phone: "(269) 743-7444",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },
  {
    name: "Mint Cannabis Coldwater",
    address: {
      street_1: "365 N Willowbrook Rd.",
      city: "Coldwater",
      state: "MI",
      postal_code: "49036",
      country: "US",
      formatted_address: "365 N Willowbrook Rd., Coldwater, MI 49036"
    },
    phone: "(517) 924-1232",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },
  {
    name: "Mint Cannabis Portage",
    address: {
      street_1: "5747 S Westnedge Ave.",
      city: "Portage",
      state: "MI",
      postal_code: "49002",
      country: "US",
      formatted_address: "5747 S Westnedge Ave., Portage, MI 49002"
    },
    phone: "(269) 459-1204",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },
  {
    name: "Mint Cannabis New Buffalo",
    address: {
      street_1: "18300 US-12",
      city: "New Buffalo",
      state: "MI",
      postal_code: "49117",
      country: "US",
      formatted_address: "18300 US-12, New Buffalo, MI 49117"
    },
    phone: "(269) 231-5473",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },
  {
    name: "Mint Cannabis Roseville",
    address: {
      street_1: "28970 Hayes Rd.",
      city: "Roseville",
      state: "MI",
      postal_code: "48066",
      country: "US",
      formatted_address: "28970 Hayes Rd., Roseville, MI 48066"
    },
    phone: "(586) 541-8897",
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
    ],
    timezone: "America/Detroit",
    is_active: true
  },

  // Nevada Locations
  {
    name: "Mint Cannabis Las Vegas Strip",
    address: {
      street_1: "4503 Paradise Rd.",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89119",
      country: "US",
      formatted_address: "4503 Paradise Rd., Las Vegas, NV 89119"
    },
    phone: "(702) 389-8556",
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
    ],
    timezone: "America/Los_Angeles",
    is_active: true
  },
  {
    name: "Mint Cannabis West Las Vegas",
    address: {
      street_1: "6332 S Rainbow Blvd, Suite 105",
      city: "Las Vegas",
      state: "NV",
      postal_code: "89118",
      country: "US",
      formatted_address: "6332 S Rainbow Blvd, Suite 105, Las Vegas, NV 89118"
    },
    phone: "(702) 659-7356",
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
    ],
    timezone: "America/Los_Angeles",
    is_active: true
  },

  // Illinois Location
  {
    name: "Mint Cannabis Willowbrook",
    address: {
      street_1: "900 75th St.",
      city: "Willowbrook",
      state: "IL",
      postal_code: "60527",
      country: "US",
      formatted_address: "900 75th St., Willowbrook, IL 60527"
    },
    phone: "(630) 216-9135",
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
    ],
    timezone: "America/Chicago",
    is_active: true
  },

  // Missouri Location
  {
    name: "Mint Cannabis St. Peters",
    address: {
      street_1: "150 Mid Rivers Mall Cir.",
      city: "St. Peters",
      state: "MO",
      postal_code: "63376",
      country: "US",
      formatted_address: "150 Mid Rivers Mall Cir., St. Peters, MO 63376"
    },
    phone: "(636) 387-1144",
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
    ],
    timezone: "America/Chicago",
    is_active: true
  }
];

async function importStores() {
  console.log(`Starting import of ${stores.length} stores...`);

  try {
    // Import using fetch to local Strapi API
    const API_URL = 'http://localhost:1337/api';

    for (let i = 0; i < stores.length; i++) {
      const storeData = stores[i];
      console.log(`\nImporting store ${i + 1}/${stores.length}: ${storeData.name}`);

      try {
        const response = await fetch(`${API_URL}/stores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: storeData
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Created store: ${result.data.attributes.name} (ID: ${result.data.id})`);
        } else {
          const errorData = await response.text();
          console.error(`❌ Failed to create store ${storeData.name}: ${response.status} ${errorData}`);
        }
      } catch (error) {
        console.error(`❌ Failed to create store ${storeData.name}:`, error.message);
      }
    }

    console.log('\n🎉 Store import completed!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Import failed:', error);
    process.exit(1);
  }
}

// Check if running directly
if (require.main === module) {
  importStores();
}

module.exports = { stores, importStores };