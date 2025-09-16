// Node.js script to populate sample store data via REST API
import fetch from 'node-fetch';

const STRAPI_URL = 'https://flmintdeal-dev.fly.dev'; // Change to your Strapi URL

async function createSampleData() {
  console.log('🚀 Creating sample store and region data...');

  try {
    // Sample regions
    const regions = [
      {
        data: {
          Name: 'South Florida',
          Code: 'SFL',
          Description: 'Covering Miami-Dade, Broward, and Palm Beach counties with premium cannabis dispensaries',
          Timezone: 'America/New_York',
          Country: 'USA',
          State: 'Florida',
          IsActive: true
        }
      },
      {
        data: {
          Name: 'Central Florida',
          Code: 'CFL',
          Description: 'Orlando metropolitan area and surrounding counties serving the heart of Florida',
          Timezone: 'America/New_York',
          Country: 'USA',
          State: 'Florida',
          IsActive: true
        }
      },
      {
        data: {
          Name: 'Tampa Bay',
          Code: 'TB',
          Description: 'Tampa, St. Petersburg, and surrounding areas on Florida\'s west coast',
          Timezone: 'America/New_York',
          Country: 'USA',
          State: 'Florida',
          IsActive: true
        }
      },
      {
        data: {
          Name: 'North Florida',
          Code: 'NFL',
          Description: 'Jacksonville, Tallahassee, and northern Florida regions',
          Timezone: 'America/New_York',
          Country: 'USA',
          State: 'Florida',
          IsActive: true
        }
      }
    ];

    // Create regions
    console.log('📍 Creating regions...');
    const createdRegions = [];
    for (const regionData of regions) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/regions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(regionData)
        });

        if (response.ok) {
          const region = await response.json();
          console.log(`✅ Created region: ${region.data.Name} (${region.data.Code})`);
          createdRegions.push(region.data);
        } else {
          const error = await response.text();
          console.error(`❌ Failed to create region ${regionData.data.Name}:`, error);
        }
      } catch (error) {
        console.error(`❌ Error creating region ${regionData.data.Name}:`, error.message);
      }
    }

    // Sample stores
    const stores = [
      {
        data: {
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
          Hours: {
            'Monday': '9:00 AM - 9:00 PM',
            'Tuesday': '9:00 AM - 9:00 PM',
            'Wednesday': '9:00 AM - 9:00 PM',
            'Thursday': '9:00 AM - 9:00 PM',
            'Friday': '9:00 AM - 10:00 PM',
            'Saturday': '9:00 AM - 10:00 PM',
            'Sunday': '10:00 AM - 8:00 PM'
          },
          IsActive: true,
          IsFeatured: true,
          StoreManager: 'Sarah Rodriguez',
          region: createdRegions.find(r => r.Code === 'SFL')?.id || null
        }
      },
      {
        data: {
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
          Hours: {
            'Monday': '8:00 AM - 8:00 PM',
            'Tuesday': '8:00 AM - 8:00 PM',
            'Wednesday': '8:00 AM - 8:00 PM',
            'Thursday': '8:00 AM - 8:00 PM',
            'Friday': '8:00 AM - 9:00 PM',
            'Saturday': '9:00 AM - 9:00 PM',
            'Sunday': '10:00 AM - 7:00 PM'
          },
          IsActive: true,
          IsFeatured: false,
          StoreManager: 'Carlos Martinez',
          region: createdRegions.find(r => r.Code === 'SFL')?.id || null
        }
      },
      {
        data: {
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
          Hours: {
            'Monday': '9:00 AM - 9:00 PM',
            'Tuesday': '9:00 AM - 9:00 PM',
            'Wednesday': '9:00 AM - 9:00 PM',
            'Thursday': '9:00 AM - 9:00 PM',
            'Friday': '9:00 AM - 10:00 PM',
            'Saturday': '9:00 AM - 10:00 PM',
            'Sunday': '10:00 AM - 8:00 PM'
          },
          IsActive: true,
          IsFeatured: true,
          StoreManager: 'Michael Thompson',
          region: createdRegions.find(r => r.Code === 'CFL')?.id || null
        }
      },
      {
        data: {
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
          Hours: {
            'Monday': '10:00 AM - 8:00 PM',
            'Tuesday': '10:00 AM - 8:00 PM',
            'Wednesday': '10:00 AM - 8:00 PM',
            'Thursday': '10:00 AM - 8:00 PM',
            'Friday': '10:00 AM - 9:00 PM',
            'Saturday': '10:00 AM - 9:00 PM',
            'Sunday': '11:00 AM - 7:00 PM'
          },
          IsActive: true,
          IsFeatured: false,
          StoreManager: 'Ashley Johnson',
          region: createdRegions.find(r => r.Code === 'CFL')?.id || null
        }
      },
      {
        data: {
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
          Hours: {
            'Monday': '9:00 AM - 9:00 PM',
            'Tuesday': '9:00 AM - 9:00 PM',
            'Wednesday': '9:00 AM - 9:00 PM',
            'Thursday': '9:00 AM - 9:00 PM',
            'Friday': '9:00 AM - 10:00 PM',
            'Saturday': '9:00 AM - 10:00 PM',
            'Sunday': '10:00 AM - 8:00 PM'
          },
          IsActive: true,
          IsFeatured: true,
          StoreManager: 'David Brown',
          region: createdRegions.find(r => r.Code === 'TB')?.id || null
        }
      },
      {
        data: {
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
          Hours: {
            'Monday': '9:00 AM - 9:00 PM',
            'Tuesday': '9:00 AM - 9:00 PM',
            'Wednesday': '9:00 AM - 9:00 PM',
            'Thursday': '9:00 AM - 9:00 PM',
            'Friday': '9:00 AM - 10:00 PM',
            'Saturday': '9:00 AM - 10:00 PM',
            'Sunday': '10:00 AM - 8:00 PM'
          },
          IsActive: true,
          IsFeatured: false,
          StoreManager: 'Kevin Wilson',
          region: createdRegions.find(r => r.Code === 'NFL')?.id || null
        }
      }
    ];

    // Create stores
    console.log('🏪 Creating stores...');
    const createdStores = [];
    for (const storeData of stores) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/stores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(storeData)
        });

        if (response.ok) {
          const store = await response.json();
          console.log(`✅ Created store: ${store.data.Name} in ${store.data.City}`);
          createdStores.push(store.data);
        } else {
          const error = await response.text();
          console.error(`❌ Failed to create store ${storeData.data.Name}:`, error);
        }
      } catch (error) {
        console.error(`❌ Error creating store ${storeData.data.Name}:`, error.message);
      }
    }

    console.log('🎉 Sample data creation completed!');
    console.log(`📊 Summary:`);
    console.log(`   - ${createdRegions.length} regions created`);
    console.log(`   - ${createdStores.length} stores created`);
    console.log('');
    console.log('You can now view the stores at: http://localhost:4321/stores');

  } catch (error) {
    console.error('💥 Error creating sample data:', error);
  }
}

// Run the script
createSampleData();

export { createSampleData };