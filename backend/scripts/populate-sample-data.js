const strapi = require('@strapi/strapi');

async function populateSampleData() {
  console.log('🚀 Starting sample data population...');

  try {
    // Sample regions data
    const regionsData = [
      {
        Name: 'South Florida',
        Code: 'SFL',
        Description: 'Covering Miami-Dade, Broward, and Palm Beach counties',
        Timezone: 'America/New_York',
        Country: 'USA',
        State: 'Florida',
        IsActive: true
      },
      {
        Name: 'Central Florida',
        Code: 'CFL', 
        Description: 'Orlando metropolitan area and surrounding counties',
        Timezone: 'America/New_York',
        Country: 'USA',
        State: 'Florida',
        IsActive: true
      },
      {
        Name: 'North Florida',
        Code: 'NFL',
        Description: 'Jacksonville, Tallahassee, and northern Florida regions',
        Timezone: 'America/New_York',
        Country: 'USA',
        State: 'Florida',
        IsActive: true
      },
      {
        Name: 'Tampa Bay',
        Code: 'TB',
        Description: 'Tampa, St. Petersburg, and surrounding areas',
        Timezone: 'America/New_York',
        Country: 'USA',
        State: 'Florida',
        IsActive: true
      }
    ];

    // Create regions first
    console.log('📍 Creating regions...');
    const createdRegions = [];
    for (const regionData of regionsData) {
      try {
        const region = await strapi.entityService.create('api::region.region', {
          data: regionData
        });
        console.log(`✅ Created region: ${region.Name} (${region.Code})`);
        createdRegions.push(region);
      } catch (error) {
        console.error(`❌ Error creating region ${regionData.Name}:`, error.message);
      }
    }

    // Sample stores data
    const storesData = [
      // South Florida stores
      {
        Name: 'FL Mint Miami Beach',
        Description: 'Premier cannabis dispensary serving Miami Beach and surrounding areas. Known for our extensive selection of premium products and knowledgeable staff.',
        Address: '1234 Ocean Drive',
        City: 'Miami Beach',
        State: 'Florida',
        ZipCode: '33139',
        Phone: '(305) 555-0101',
        Email: 'miamibeach@flmint.com',
        Website: 'https://flmint.com/locations/miami-beach',
        Latitude: 25.7617,
        Longitude: -80.1918,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 9:00 PM',
          'Tuesday': '9:00 AM - 9:00 PM', 
          'Wednesday': '9:00 AM - 9:00 PM',
          'Thursday': '9:00 AM - 9:00 PM',
          'Friday': '9:00 AM - 10:00 PM',
          'Saturday': '9:00 AM - 10:00 PM',
          'Sunday': '10:00 AM - 8:00 PM'
        }),
        IsActive: true,
        IsFeatured: true,
        StoreManager: 'Sarah Rodriguez',
        region: createdRegions.find(r => r.Code === 'SFL')?.id
      },
      {
        Name: 'FL Mint Brickell',
        Description: 'Modern dispensary in the heart of Brickell financial district, offering convenience for downtown professionals.',
        Address: '789 Brickell Avenue',
        City: 'Miami',
        State: 'Florida',
        ZipCode: '33131',
        Phone: '(305) 555-0102',
        Email: 'brickell@flmint.com',
        Website: 'https://flmint.com/locations/brickell',
        Latitude: 25.7663,
        Longitude: -80.1918,
        Hours: JSON.stringify({
          'Monday': '8:00 AM - 8:00 PM',
          'Tuesday': '8:00 AM - 8:00 PM',
          'Wednesday': '8:00 AM - 8:00 PM', 
          'Thursday': '8:00 AM - 8:00 PM',
          'Friday': '8:00 AM - 9:00 PM',
          'Saturday': '9:00 AM - 9:00 PM',
          'Sunday': '10:00 AM - 7:00 PM'
        }),
        IsActive: true,
        IsFeatured: false,
        StoreManager: 'Carlos Martinez',
        region: createdRegions.find(r => r.Code === 'SFL')?.id
      },
      {
        Name: 'FL Mint Fort Lauderdale',
        Description: 'Spacious location with drive-through service and comprehensive product education center.',
        Address: '2468 Las Olas Boulevard',
        City: 'Fort Lauderdale',
        State: 'Florida',
        ZipCode: '33301',
        Phone: '(954) 555-0103',
        Email: 'fortlauderdale@flmint.com',
        Website: 'https://flmint.com/locations/fort-lauderdale',
        Latitude: 26.1224,
        Longitude: -80.1373,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 9:00 PM',
          'Tuesday': '9:00 AM - 9:00 PM',
          'Wednesday': '9:00 AM - 9:00 PM',
          'Thursday': '9:00 AM - 9:00 PM',
          'Friday': '9:00 AM - 10:00 PM',
          'Saturday': '9:00 AM - 10:00 PM',
          'Sunday': '10:00 AM - 8:00 PM'
        }),
        IsActive: true,
        IsFeatured: true,
        StoreManager: 'Jennifer Williams',
        region: createdRegions.find(r => r.Code === 'SFL')?.id
      },

      // Central Florida stores
      {
        Name: 'FL Mint Orlando Downtown',
        Description: 'Flagship Central Florida location with state-of-the-art facilities and extensive product variety.',
        Address: '1357 Orange Avenue',
        City: 'Orlando',
        State: 'Florida',
        ZipCode: '32801',
        Phone: '(407) 555-0201',
        Email: 'orlando@flmint.com',
        Website: 'https://flmint.com/locations/orlando',
        Latitude: 28.5383,
        Longitude: -81.3792,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 9:00 PM',
          'Tuesday': '9:00 AM - 9:00 PM',
          'Wednesday': '9:00 AM - 9:00 PM',
          'Thursday': '9:00 AM - 9:00 PM',
          'Friday': '9:00 AM - 10:00 PM',
          'Saturday': '9:00 AM - 10:00 PM',
          'Sunday': '10:00 AM - 8:00 PM'
        }),
        IsActive: true,
        IsFeatured: true,
        StoreManager: 'Michael Thompson',
        region: createdRegions.find(r => r.Code === 'CFL')?.id
      },
      {
        Name: 'FL Mint Winter Park',
        Description: 'Boutique dispensary in historic Winter Park, focusing on premium craft cannabis products.',
        Address: '900 Park Avenue',
        City: 'Winter Park',
        State: 'Florida',
        ZipCode: '32789',
        Phone: '(407) 555-0202',
        Email: 'winterpark@flmint.com',
        Website: 'https://flmint.com/locations/winter-park',
        Latitude: 28.5999,
        Longitude: -81.3395,
        Hours: JSON.stringify({
          'Monday': '10:00 AM - 8:00 PM',
          'Tuesday': '10:00 AM - 8:00 PM',
          'Wednesday': '10:00 AM - 8:00 PM',
          'Thursday': '10:00 AM - 8:00 PM',
          'Friday': '10:00 AM - 9:00 PM',
          'Saturday': '10:00 AM - 9:00 PM',
          'Sunday': '11:00 AM - 7:00 PM'
        }),
        IsActive: true,
        IsFeatured: false,
        StoreManager: 'Ashley Johnson',
        region: createdRegions.find(r => r.Code === 'CFL')?.id
      },

      // Tampa Bay stores
      {
        Name: 'FL Mint Tampa',
        Description: 'Large format store with consultation rooms and comprehensive wellness programs.',
        Address: '5678 Kennedy Boulevard',
        City: 'Tampa',
        State: 'Florida',
        ZipCode: '33609',
        Phone: '(813) 555-0301',
        Email: 'tampa@flmint.com',
        Website: 'https://flmint.com/locations/tampa',
        Latitude: 27.9506,
        Longitude: -82.4572,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 9:00 PM',
          'Tuesday': '9:00 AM - 9:00 PM',
          'Wednesday': '9:00 AM - 9:00 PM',
          'Thursday': '9:00 AM - 9:00 PM',
          'Friday': '9:00 AM - 10:00 PM',
          'Saturday': '9:00 AM - 10:00 PM',
          'Sunday': '10:00 AM - 8:00 PM'
        }),
        IsActive: true,
        IsFeatured: true,
        StoreManager: 'David Brown',
        region: createdRegions.find(r => r.Code === 'TB')?.id
      },
      {
        Name: 'FL Mint St. Petersburg',
        Description: 'Waterfront location with focus on medical cannabis and patient education.',
        Address: '1122 Central Avenue',
        City: 'St. Petersburg',
        State: 'Florida',
        ZipCode: '33701',
        Phone: '(727) 555-0302',
        Email: 'stpete@flmint.com',
        Website: 'https://flmint.com/locations/st-petersburg',
        Latitude: 27.7676,
        Longitude: -82.6403,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 8:00 PM',
          'Tuesday': '9:00 AM - 8:00 PM',
          'Wednesday': '9:00 AM - 8:00 PM',
          'Thursday': '9:00 AM - 8:00 PM',
          'Friday': '9:00 AM - 9:00 PM',
          'Saturday': '9:00 AM - 9:00 PM',
          'Sunday': '10:00 AM - 7:00 PM'
        }),
        IsActive: true,
        IsFeatured: false,
        StoreManager: 'Lisa Davis',
        region: createdRegions.find(r => r.Code === 'TB')?.id
      },

      // North Florida stores
      {
        Name: 'FL Mint Jacksonville',
        Description: 'North Florida flagship with full-service lab testing and custom product consultations.',
        Address: '3344 Beach Boulevard',
        City: 'Jacksonville',
        State: 'Florida',
        ZipCode: '32207',
        Phone: '(904) 555-0401',
        Email: 'jacksonville@flmint.com',
        Website: 'https://flmint.com/locations/jacksonville',
        Latitude: 30.3322,
        Longitude: -81.6557,
        Hours: JSON.stringify({
          'Monday': '9:00 AM - 9:00 PM',
          'Tuesday': '9:00 AM - 9:00 PM',
          'Wednesday': '9:00 AM - 9:00 PM',
          'Thursday': '9:00 AM - 9:00 PM',
          'Friday': '9:00 AM - 10:00 PM',
          'Saturday': '9:00 AM - 10:00 PM',
          'Sunday': '10:00 AM - 8:00 PM'
        }),
        IsActive: true,
        IsFeatured: false,
        StoreManager: 'Kevin Wilson',
        region: createdRegions.find(r => r.Code === 'NFL')?.id
      },
      {
        Name: 'FL Mint Tallahassee',
        Description: 'University area location catering to students and faculty with educational programs.',
        Address: '7890 Apalachee Parkway',
        City: 'Tallahassee',
        State: 'Florida',
        ZipCode: '32301',
        Phone: '(850) 555-0402',
        Email: 'tallahassee@flmint.com',
        Website: 'https://flmint.com/locations/tallahassee',
        Latitude: 30.4518,
        Longitude: -84.27277,
        Hours: JSON.stringify({
          'Monday': '10:00 AM - 8:00 PM',
          'Tuesday': '10:00 AM - 8:00 PM',
          'Wednesday': '10:00 AM - 8:00 PM',
          'Thursday': '10:00 AM - 8:00 PM',
          'Friday': '10:00 AM - 9:00 PM',
          'Saturday': '10:00 AM - 9:00 PM',
          'Sunday': '11:00 AM - 7:00 PM'
        }),
        IsActive: true,
        IsFeatured: false,
        StoreManager: 'Amanda Garcia',
        region: createdRegions.find(r => r.Code === 'NFL')?.id
      }
    ];

    // Create stores
    console.log('🏪 Creating stores...');
    const createdStores = [];
    for (const storeData of storesData) {
      try {
        const store = await strapi.entityService.create('api::store.store', {
          data: storeData
        });
        console.log(`✅ Created store: ${store.Name} in ${store.City}`);
        createdStores.push(store);
      } catch (error) {
        console.error(`❌ Error creating store ${storeData.Name}:`, error.message);
      }
    }

    // Get existing dosage products and randomly assign them to stores
    console.log('🔗 Linking products to stores...');
    try {
      const products = await strapi.entityService.findMany('api::dosage-product.dosage-product', {
        limit: 100
      });

      if (products && products.length > 0) {
        for (const store of createdStores) {
          // Randomly assign 5-15 products to each store
          const numberOfProducts = Math.floor(Math.random() * 11) + 5; // 5-15 products
          const shuffledProducts = products.sort(() => 0.5 - Math.random());
          const storeProducts = shuffledProducts.slice(0, numberOfProducts);
          
          // Update the store with product relationships
          await strapi.entityService.update('api::store.store', store.id, {
            data: {
              dosage_products: storeProducts.map(p => p.id)
            }
          });
          
          console.log(`🔗 Linked ${storeProducts.length} products to ${store.Name}`);
        }
      } else {
        console.log('⚠️ No dosage products found to link to stores');
      }
    } catch (error) {
      console.error('❌ Error linking products to stores:', error.message);
    }

    console.log('🎉 Sample data population completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${createdRegions.length} regions created`);
    console.log(`   - ${createdStores.length} stores created`);
    console.log('');
    console.log('You can now view the stores at: http://localhost:4321/stores');

  } catch (error) {
    console.error('💥 Error populating sample data:', error);
  }
}

module.exports = {
  populateSampleData
};

// If running this script directly
if (require.main === module) {
  const strapiInstance = strapi({
    // Add any required config here
  });
  
  strapiInstance.load().then(() => {
    populateSampleData().then(() => {
      process.exit(0);
    }).catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
  });
}