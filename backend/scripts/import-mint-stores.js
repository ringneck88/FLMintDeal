/**
 * Import script for Mint Cannabis store locations
 * This script adds all store data from mintdeals.com to Strapi CMS
 */

const storeData = {
  brand: {
    name: "Mint Cannabis",
    slug: "mint-cannabis",
    description: "Premium cannabis dispensary chain with locations across multiple states. Recently named 'Most Innovative Medical Cannabis Dispensary'",
    website: "https://mintdeals.com",
    phone: "480-749-6468",
    is_active: true
  },

  regions: [
    {
      name: "Arizona",
      code: "AZ",
      timezone: "America/Phoenix"
    },
    {
      name: "Michigan",
      code: "MI",
      timezone: "America/Detroit"
    },
    {
      name: "Illinois",
      code: "IL",
      timezone: "America/Chicago"
    },
    {
      name: "Missouri",
      code: "MO",
      timezone: "America/Chicago"
    }
  ],

  cities: [
    {
      name: "Guadalupe",
      slug: "guadalupe-az",
      region: "Arizona"
    },
    {
      name: "Phoenix",
      slug: "phoenix-az",
      region: "Arizona"
    },
    {
      name: "Scottsdale",
      slug: "scottsdale-az",
      region: "Arizona"
    },
    {
      name: "Kalamazoo",
      slug: "kalamazoo-mi",
      region: "Michigan"
    },
    {
      name: "Roseville",
      slug: "roseville-mi",
      region: "Michigan"
    },
    {
      name: "Willowbrook",
      slug: "willowbrook-il",
      region: "Illinois"
    },
    {
      name: "St. Peters",
      slug: "st-peters-mo",
      region: "Missouri"
    }
  ],

  stores: [
    {
      name: "Mint Cannabis - Tempe/Guadalupe",
      slug: "mint-cannabis-tempe-guadalupe",
      store_code: "MINT-AZ-001",
      brand: "Mint Cannabis",
      region: "Arizona",
      city: "Guadalupe",
      address: {
        street: "5210 S Priest Dr",
        city: "Guadalupe",
        state: "AZ",
        zip_code: "85283",
        country: "United States"
      },
      geo: {
        latitude: 33.3711,
        longitude: -112.0471
      },
      phone: "480-749-6468",
      email: null,
      timezone: "America/Phoenix",
      hours: {
        monday: { open: "00:00", close: "23:59", is_closed: false },
        tuesday: { open: "00:00", close: "23:59", is_closed: false },
        wednesday: { open: "00:00", close: "23:59", is_closed: false },
        thursday: { open: "00:00", close: "23:59", is_closed: false },
        friday: { open: "00:00", close: "23:59", is_closed: false },
        saturday: { open: "00:00", close: "23:59", is_closed: false },
        sunday: { open: "00:00", close: "23:59", is_closed: false }
      },
      services: [
        { name: "Drive-Thru", is_available: true },
        { name: "Online Ordering", is_available: true },
        { name: "Delivery", is_available: false },
        { name: "Curbside Pickup", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "ATM Available", description: "On-site ATM for convenience" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/tempe-az/menu/",
      online_ordering_url: "https://mintdeals.com/tempe-az/"
    },
    {
      name: "Mint Cannabis - Phoenix Cave Creek",
      slug: "mint-cannabis-phoenix-cave-creek",
      store_code: "MINT-AZ-002",
      brand: "Mint Cannabis",
      region: "Arizona",
      city: "Phoenix",
      address: {
        street: "17036 N Cave Creek Rd",
        city: "Phoenix",
        state: "AZ",
        zip_code: "85032",
        country: "United States"
      },
      geo: {
        latitude: 33.6119,
        longitude: -112.0431
      },
      phone: "480-749-6468",
      email: null,
      timezone: "America/Phoenix",
      hours: {
        monday: { open: "08:00", close: "22:00", is_closed: false },
        tuesday: { open: "08:00", close: "22:00", is_closed: false },
        wednesday: { open: "08:00", close: "22:00", is_closed: false },
        thursday: { open: "08:00", close: "22:00", is_closed: false },
        friday: { open: "08:00", close: "22:00", is_closed: false },
        saturday: { open: "08:00", close: "22:00", is_closed: false },
        sunday: { open: "08:00", close: "22:00", is_closed: false }
      },
      services: [
        { name: "Drive-Thru", is_available: true },
        { name: "Online Ordering", is_available: true },
        { name: "Delivery", is_available: false },
        { name: "Curbside Pickup", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "Cannabis Events", description: "Regular cannabis education events" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/phoenix-az/menu/",
      online_ordering_url: "https://mintdeals.com/phoenix-az/"
    },
    {
      name: "Mint Cannabis - Scottsdale",
      slug: "mint-cannabis-scottsdale",
      store_code: "MINT-AZ-003",
      brand: "Mint Cannabis",
      region: "Arizona",
      city: "Scottsdale",
      address: {
        street: "8729 E Manzanita Dr",
        city: "Scottsdale",
        state: "AZ",
        zip_code: "85258",
        country: "United States"
      },
      geo: {
        latitude: 33.4942,
        longitude: -111.8808
      },
      phone: "480-749-6468",
      email: null,
      timezone: "America/Phoenix",
      hours: {
        monday: { open: "08:00", close: "22:00", is_closed: false },
        tuesday: { open: "08:00", close: "22:00", is_closed: false },
        wednesday: { open: "08:00", close: "22:00", is_closed: false },
        thursday: { open: "08:00", close: "22:00", is_closed: false },
        friday: { open: "08:00", close: "22:00", is_closed: false },
        saturday: { open: "08:00", close: "22:00", is_closed: false },
        sunday: { open: "08:00", close: "22:00", is_closed: false }
      },
      services: [
        { name: "Drive-Thru", is_available: true },
        { name: "Online Ordering", is_available: true },
        { name: "Delivery", is_available: false },
        { name: "Shuttle Service", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "Premium Products", description: "Curated selection of top brands" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/scottsdale-az/menu/",
      online_ordering_url: "https://mintdeals.com/scottsdale-az/"
    },
    {
      name: "Mint Cannabis - Kalamazoo",
      slug: "mint-cannabis-kalamazoo",
      store_code: "MINT-MI-001",
      brand: "Mint Cannabis",
      region: "Michigan",
      city: "Kalamazoo",
      address: {
        street: "730 East Cork Street",
        city: "Kalamazoo",
        state: "MI",
        zip_code: "49001",
        country: "United States"
      },
      geo: {
        latitude: 42.2917,
        longitude: -85.5872
      },
      phone: "269-743-7444",
      email: null,
      timezone: "America/Detroit",
      hours: {
        monday: { open: "09:00", close: "21:00", is_closed: false },
        tuesday: { open: "09:00", close: "21:00", is_closed: false },
        wednesday: { open: "09:00", close: "21:00", is_closed: false },
        thursday: { open: "09:00", close: "21:00", is_closed: false },
        friday: { open: "09:00", close: "21:00", is_closed: false },
        saturday: { open: "09:00", close: "21:00", is_closed: false },
        sunday: { open: "09:00", close: "21:00", is_closed: false }
      },
      services: [
        { name: "Online Ordering", is_available: true },
        { name: "Curbside Pickup", is_available: true },
        { name: "Order Ahead", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "High Rating", description: "4.8/5 stars from 1,074+ reviews" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/kalamazoo-mi/menu/",
      online_ordering_url: "https://mintdeals.com/kalamazoo-mi/"
    },
    {
      name: "Mint Cannabis - Roseville",
      slug: "mint-cannabis-roseville",
      store_code: "MINT-MI-002",
      brand: "Mint Cannabis",
      region: "Michigan",
      city: "Roseville",
      address: {
        street: "28970 Hayes Rd",
        city: "Roseville",
        state: "MI",
        zip_code: "48066",
        country: "United States"
      },
      geo: {
        latitude: 42.4973,
        longitude: -82.9371
      },
      phone: "586-541-8897",
      email: null,
      timezone: "America/Detroit",
      hours: {
        monday: { open: "09:00", close: "21:00", is_closed: false },
        tuesday: { open: "09:00", close: "21:00", is_closed: false },
        wednesday: { open: "09:00", close: "21:00", is_closed: false },
        thursday: { open: "09:00", close: "21:00", is_closed: false },
        friday: { open: "09:00", close: "21:00", is_closed: false },
        saturday: { open: "09:00", close: "21:00", is_closed: false },
        sunday: { open: "09:00", close: "21:00", is_closed: false }
      },
      services: [
        { name: "Online Ordering", is_available: true },
        { name: "Curbside Pickup", is_available: true },
        { name: "Cannabis Events", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "Mailing List", description: "Deal notifications via email" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/roseville-mi/menu/",
      online_ordering_url: "https://mintdeals.com/roseville-mi/"
    },
    {
      name: "Mint Cannabis - Willowbrook",
      slug: "mint-cannabis-willowbrook",
      store_code: "MINT-IL-001",
      brand: "Mint Cannabis",
      region: "Illinois",
      city: "Willowbrook",
      address: {
        street: "900 75th St",
        city: "Willowbrook",
        state: "IL",
        zip_code: "60527",
        country: "United States"
      },
      geo: {
        latitude: 41.7697,
        longitude: -87.9342
      },
      phone: "630-216-9135",
      email: null,
      timezone: "America/Chicago",
      hours: {
        monday: { open: "08:00", close: "22:00", is_closed: false },
        tuesday: { open: "08:00", close: "22:00", is_closed: false },
        wednesday: { open: "08:00", close: "22:00", is_closed: false },
        thursday: { open: "08:00", close: "22:00", is_closed: false },
        friday: { open: "08:00", close: "22:00", is_closed: false },
        saturday: { open: "08:00", close: "22:00", is_closed: false },
        sunday: { open: "08:00", close: "22:00", is_closed: false }
      },
      services: [
        { name: "Online Ordering", is_available: true },
        { name: "Curbside Pickup", is_available: true },
        { name: "Cannabis Consultation", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "Wellness Focus", description: "Focus on customer wellness and convenience" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/willowbrook-il/menu/",
      online_ordering_url: "https://mintdeals.com/willowbrook-il/"
    },
    {
      name: "Mint Cannabis - St. Peters",
      slug: "mint-cannabis-st-peters",
      store_code: "MINT-MO-001",
      brand: "Mint Cannabis",
      region: "Missouri",
      city: "St. Peters",
      address: {
        street: "150 Mid Rivers Mall Cir",
        city: "St. Peters",
        state: "MO",
        zip_code: "63376",
        country: "United States"
      },
      geo: {
        latitude: 38.7985,
        longitude: -90.6190
      },
      phone: "636-387-1144",
      email: null,
      timezone: "America/Chicago",
      hours: {
        monday: { open: "08:00", close: "21:00", is_closed: false },
        tuesday: { open: "08:00", close: "21:00", is_closed: false },
        wednesday: { open: "08:00", close: "21:00", is_closed: false },
        thursday: { open: "08:00", close: "21:00", is_closed: false },
        friday: { open: "08:00", close: "21:00", is_closed: false },
        saturday: { open: "08:00", close: "21:00", is_closed: false },
        sunday: { open: "08:00", close: "21:00", is_closed: false }
      },
      services: [
        { name: "Online Ordering", is_available: true },
        { name: "Cannabis Events", is_available: true },
        { name: "Product Education", is_available: true }
      ],
      amenities: [
        { name: "Rewards Program", description: "Earn Weed rewards program" },
        { name: "Daily Deals", description: "Daily cannabis specials" },
        { name: "Mall Location", description: "Convenient mall location with parking" }
      ],
      is_active: true,
      menu_url: "https://mintdeals.com/st-peters-mo/menu/",
      online_ordering_url: "https://mintdeals.com/st-peters-mo/"
    }
  ]
};

console.log('Mint Cannabis Store Data for Import:');
console.log('=====================================');
console.log('Brand:', storeData.brand.name);
console.log('Regions:', storeData.regions.length);
console.log('Cities:', storeData.cities.length);
console.log('Stores:', storeData.stores.length);
console.log('');
console.log('Store Locations:');
storeData.stores.forEach((store, index) => {
  console.log(`${index + 1}. ${store.name}`);
  console.log(`   Address: ${store.address.street}, ${store.address.city}, ${store.address.state} ${store.address.zip_code}`);
  console.log(`   Phone: ${store.phone}`);
  console.log(`   Hours: ${store.hours.monday.open} - ${store.hours.monday.close}`);
  console.log('');
});

module.exports = storeData;