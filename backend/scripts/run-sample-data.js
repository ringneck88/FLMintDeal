// Run this in Strapi console: npm run strapi console
// Then copy and paste this code

async function createSampleData() {
  console.log('🚀 Creating sample data...');

  // Create regions
  const regions = [
    { Name: 'South Florida', Code: 'SFL', Description: 'Miami-Dade, Broward, and Palm Beach counties', Timezone: 'America/New_York', Country: 'USA', State: 'Florida', IsActive: true },
    { Name: 'Central Florida', Code: 'CFL', Description: 'Orlando metropolitan area', Timezone: 'America/New_York', Country: 'USA', State: 'Florida', IsActive: true },
    { Name: 'Tampa Bay', Code: 'TB', Description: 'Tampa, St. Petersburg area', Timezone: 'America/New_York', Country: 'USA', State: 'Florida', IsActive: true },
    { Name: 'North Florida', Code: 'NFL', Description: 'Jacksonville, Tallahassee region', Timezone: 'America/New_York', Country: 'USA', State: 'Florida', IsActive: true }
  ];

  const createdRegions = [];
  for (const regionData of regions) {
    const region = await strapi.entityService.create('api::region.region', { data: regionData });
    console.log(`✅ Created region: ${region.Name}`);
    createdRegions.push(region);
  }

  // Create stores
  const stores = [
    {
      Name: 'FL Mint Miami Beach',
      Description: 'Premier cannabis dispensary serving Miami Beach area',
      Address: '1234 Ocean Drive',
      City: 'Miami Beach',
      State: 'Florida',
      ZipCode: '33139',
      Phone: '(305) 555-0101',
      Email: 'miamibeach@flmint.com',
      Latitude: 25.7617,
      Longitude: -80.1918,
      IsActive: true,
      IsFeatured: true,
      StoreManager: 'Sarah Rodriguez',
      region: createdRegions.find(r => r.Code === 'SFL').id
    },
    {
      Name: 'FL Mint Orlando Downtown',
      Description: 'Flagship Central Florida location',
      Address: '1357 Orange Avenue',
      City: 'Orlando',
      State: 'Florida',
      ZipCode: '32801',
      Phone: '(407) 555-0201',
      Email: 'orlando@flmint.com',
      Latitude: 28.5383,
      Longitude: -81.3792,
      IsActive: true,
      IsFeatured: true,
      StoreManager: 'Michael Thompson',
      region: createdRegions.find(r => r.Code === 'CFL').id
    },
    {
      Name: 'FL Mint Tampa',
      Description: 'Large format store with consultation rooms',
      Address: '5678 Kennedy Boulevard',
      City: 'Tampa',
      State: 'Florida',
      ZipCode: '33609',
      Phone: '(813) 555-0301',
      Email: 'tampa@flmint.com',
      Latitude: 27.9506,
      Longitude: -82.4572,
      IsActive: true,
      IsFeatured: true,
      StoreManager: 'David Brown',
      region: createdRegions.find(r => r.Code === 'TB').id
    },
    {
      Name: 'FL Mint Jacksonville',
      Description: 'North Florida flagship location',
      Address: '3344 Beach Boulevard',
      City: 'Jacksonville',
      State: 'Florida',
      ZipCode: '32207',
      Phone: '(904) 555-0401',
      Email: 'jacksonville@flmint.com',
      Latitude: 30.3322,
      Longitude: -81.6557,
      IsActive: true,
      IsFeatured: false,
      StoreManager: 'Kevin Wilson',
      region: createdRegions.find(r => r.Code === 'NFL').id
    }
  ];

  for (const storeData of stores) {
    const store = await strapi.entityService.create('api::store.store', { data: storeData });
    console.log(`✅ Created store: ${store.Name}`);
  }

  console.log('🎉 Sample data created successfully!');
}

// Run the function
createSampleData().catch(console.error);