const axios = require('axios');

async function setupPermissions() {
  const API_BASE = 'http://localhost:1337';

  try {
    console.log('🔐 Setting up Strapi API permissions...');

    // Get the public role
    const rolesResponse = await axios.get(`${API_BASE}/users-permissions/roles`);
    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');

    if (!publicRole) {
      console.error('❌ Public role not found');
      return;
    }

    console.log(`✅ Found public role with ID: ${publicRole.id}`);

    // Define the content types that need public access
    const contentTypes = [
      'api::store.store',
      'api::deal.deal',
      'api::brand.brand',
      'api::city.city',
      'api::region.region',
      'api::announcement.announcement',
      'api::event.event',
      'api::promotion.promotion',
      'api::dosage-form.dosage-form',
      'api::dosage-product.dosage-product',
      'api::page.page',
      'api::global.global'
    ];

    // Current permissions
    const currentPermissions = publicRole.permissions || {};

    // Add read permissions for all content types
    contentTypes.forEach(contentType => {
      if (!currentPermissions[contentType]) {
        currentPermissions[contentType] = {};
      }

      // Enable find and findOne permissions
      currentPermissions[contentType].controllers = {
        '*': {
          find: { enabled: true },
          findOne: { enabled: true }
        }
      };
    });

    // Update the public role permissions
    const updateData = {
      ...publicRole,
      permissions: currentPermissions
    };

    const updateResponse = await axios.put(`${API_BASE}/users-permissions/roles/${publicRole.id}`, updateData);

    if (updateResponse.status === 200) {
      console.log('✅ Permissions updated successfully!');
      console.log('📡 Testing API endpoints...');

      // Test the endpoints
      for (const contentType of contentTypes) {
        const endpoint = contentType.replace('api::', '').replace('.', 's');
        try {
          const testResponse = await axios.get(`${API_BASE}/api/${endpoint}`);
          console.log(`✅ ${endpoint}: ${testResponse.status}`);
        } catch (error) {
          console.log(`❌ ${endpoint}: ${error.response?.status || 'Error'}`);
        }
      }
    } else {
      console.error('❌ Failed to update permissions');
    }

  } catch (error) {
    console.error('❌ Error setting up permissions:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

setupPermissions();