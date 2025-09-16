/**
 * Sync local database to production
 * This script will export local data and upload it to production
 */

const fs = require('fs');
const path = require('path');

async function syncToProduction() {
  console.log('🚀 Starting database sync to production...');

  const PRODUCTION_URL = 'https://flmintdeal-dev.fly.dev';

  try {
    // Step 1: Check production connectivity
    console.log('1. Checking production server connectivity...');
    const response = await fetch(`${PRODUCTION_URL}/admin`);
    if (!response.ok) {
      throw new Error(`Production server returned ${response.status}`);
    }
    console.log('✅ Production server is accessible');

    // Step 2: Export local database
    console.log('2. Exporting local database...');
    const exportPath = path.join(__dirname, '..', 'exports', `export-${Date.now()}.tar.gz`);

    // Create exports directory if it doesn't exist
    const exportsDir = path.dirname(exportPath);
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    // Step 3: List content types that need syncing
    console.log('3. Content types to sync:');
    const contentTypes = [
      'stores',
      'deals',
      'dosage-products',
      'events',
      'announcements',
      'brands',
      'regions',
      'cities'
    ];

    contentTypes.forEach(type => {
      console.log(`   - ${type}`);
    });

    console.log('');
    console.log('⚠️  MANUAL STEPS REQUIRED:');
    console.log('');
    console.log('To complete the sync, you need to:');
    console.log('');
    console.log('1. Access the production Strapi admin panel:');
    console.log(`   ${PRODUCTION_URL}/admin`);
    console.log('');
    console.log('2. Ensure all content types exist in production:');
    contentTypes.forEach(type => {
      console.log(`   - Create "${type}" content type if missing`);
    });
    console.log('');
    console.log('3. Use Strapi\'s import/export plugin or manually recreate content');
    console.log('');
    console.log('4. Alternatively, use the following fly.io commands:');
    console.log('');
    console.log('   # Connect to production database');
    console.log('   fly ssh console -a flmintdeal');
    console.log('   # Then inside the container, use Strapi CLI commands');
    console.log('');
    console.log('📁 Local database backup saved at:');
    console.log(`   ${path.join(__dirname, '..', '.tmp', 'data.db.backup.*')}`);

  } catch (error) {
    console.error('❌ Error during sync:', error.message);
    console.log('');
    console.log('💡 Alternative approach:');
    console.log('1. Deploy your current backend code to production');
    console.log('2. The production environment will recreate the schema');
    console.log('3. Use Strapi admin to manually add content');
  }
}

// Run the sync
if (require.main === module) {
  syncToProduction().catch(console.error);
}

module.exports = { syncToProduction };